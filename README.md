````
  _________ __                       
 /   _____//  |_  ____ ______  ______
 \_____  \\   __\/ __ \\____ \/  ___/
 /        \|  | \  ___/|  |_> >___ \ 
/_______  /|__|  \___  >   __/____  >
        \/           \/|__|       \/ 
        
````
##About Steps
I wanted a way to easily handle async requests in parallel, so I wrote this lil' guy. It isn't as fully featured as some other promises library, however it should work for a lot of different types of use cases.

##Example
````js
  
  // check out test/index.js
  // for more examples
  
  var requests = [{
    key: 'firstRequest',
    func: function func(fn) {
      // fn(null, {key: val});
    },
    callback: function callback(err, data, key, obj) {
      // default callback & params
    }
  }];
  
  var step = steps(requests);
  step
    .then({})
    .then({})
    // you can have .done's in the 
    // middle of your stack to handle
    .done(function(model) {
      // do stuff at this point in
      // requests stacks
    })
    .then({})
    .then({})
    .done(function(model) {
      // do stuff...
    });
````
