var expect = require('expect.js'),
    steps = require('../lib/steps');

describe('steps.js test suite', function() {

  var totalCount = 0;

  function func(fn) {
    fn(null, {totalCount: ++totalCount});
  }

  function callback(err, data, key, obj) {
    expect(err).to.be(null);
    expect(data).to.be.an(Object);
    expect(data['totalCount']).to.eql(totalCount);
    expect(obj.key).to.eql(key);
  }

  it('should be able to process a requests arr', function(done) {

    var requests = [      
      {
        key: 'firstRequest',
        func: func,
        callback: callback
      }
    ];

    steps(requests, function(resp) {
      expect(Object.keys(resp).length).to.eql(1);
    }).then({
      key: 'secondRequest',
      func: func,
      callback: callback
    }).done(function(resp) {
      expect(Object.keys(resp).length).to.eql(2);
      done();
    });

  });

  it('should be able to have thens added', function(done) {
    var step = steps([
      {
        key: 'thirdRequest',
        func: func,
        callback: callback
      }
    ]);
    step.then({
      key: 'fourthRequest',
      func: func,
      callback: callback
    }).then({
      key: 'fifthRequest',
      func: func,
      callback: callback
    }).then({
      key: 'sixthRequest',
      func: func,
      callback: callback
    }).then({
      key: 'seventhRequest',
      func: func,
      callback: callback
    }).done(function(resp) {
      expect(Object.keys(resp).length).to.eql(5);
      done();
    });
  });

});