/*
 * steps is a simple request processor
 * allows for simple promise like binding
 */

if (typeof module == 'object' && module.exports) module.exports = steps;

function steps(queue, end) {

  var copy, model, processing, processed, pub, q;
  copy = Array.prototype.slice;

  if (end) {
    processed = end;
  }

  model = {};

  processing = false;

  if (typeof queue == 'undefined') {
    q = queue = [];
  } else {
    q = copy.call(queue);
  }

  function processor(finished) {
    var current = {};
    if (q instanceof Array) {
      current = q.shift();
    }
    if (typeof current.func != 'undefined') {
      current.func(function(err, resp) {
        if (resp) model[current.key] = resp;
        if (current.callback) current.callback(err, resp, current.key, current);
      });
    }
    if (q.length) {
      processor(finished);
    } else {
      processing = false;
      return finished(model);
    }
  }

  function done(fn) {
    if (!processing && q.length) {
      processing = true;
      processor(fn);
    } else {
      if (fn) processed = fn;
    }
    return pub;
  }

  function then(obj) {
    if (typeof obj == 'object') {
      q.push(obj);
    }
    return pub;
  }

  pub = {
    done: done,
    then: then
  };

  if (q.length && processed) {
    done(processed);
  }

  return pub;
}