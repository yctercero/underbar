(function() {
  'use strict';

  window._ = {};

  // Remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

 
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

 
  _.last = function(array, n) {
    if(n === undefined){
      return array[array.length - 1]; //last element
    } else if(n > array.length){
      return array;
    }else{
      return array.slice(array.length - n);
    }
  };


  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }else{
      for(var item in collection){
        iterator(collection[item], item, collection);
      }
    }
  };


  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };


  _.filter = function(collection, test) {
    var passed = [];

    _.each(collection, function(item){
      if(test(item)){
        passed.push(item);
      }
    });

    return passed;
  };

 
  _.reject = function(collection, test) {
    return _.filter(collection, function(item){
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqueArr = [];

    _.each(array, function(item){
      if(_.indexOf(uniqueArr, item) === -1){
        uniqueArr.push(item);
      }
    });

    return uniqueArr;
  };


  _.map = function(collection, iterator) {
    var newArr = [];

    _.each(collection, function(item){
      newArr.push(iterator(item));
    });

    return newArr;
  };


  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };


  _.reduce = function(collection, iterator, accumulator) {
      var first = true;

    _.each(collection, function(item, key, collection){

      if(accumulator === undefined && first == true){
        accumulator = item;
        first = false;
      }else{
        accumulator = iterator(accumulator, item, key, collection);
      }

    });

    return accumulator;
  };


  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  _.every = function(collection, iterator) {
    // Was searching for a more succinct way of writing this function and found a great example
    // Here we define iterator, if it exists or not
    var test = iterator || _.identity;
    return _.reduce(collection, function(startVal, item){
      // if an iterator exists then that's what will go here, if not then iterator is the value of identity(item) ==> item
      return startVal && !!test(item)
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    // In theory, what I would want to be able to do is return every as soon as startVal 
    // (within reduce that's within every) returned true, but startVal is out of scope
    // return _.every(collection, function(item){
    //    if(!item){
    //     return true;
    //    }

    // });

    return _.reduce(collection, function(startVal, item){
    
      if(iterator){
        if(iterator(item)){
          return true;
        }
      } else if(item){
        return true;
      }

      return startVal;
    }, false);

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var allArgs = arguments;

    return _.reduce(allArgs, function(startVal, indObj, key, collection){
        _.each(indObj, function(item, key){
          startVal[key] = item;
        });
      
      return startVal;
    }, allArgs[0]);

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var allArgs = Array.prototype.slice.call(arguments);

    return _.reduce(allArgs, function(startVal, indObj, key, collection){
        _.each(indObj, function(item, key){
          // Resource used to figure out how to pass test regarding 'falsyness'
          // http://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
          if(!(key in startVal)){
            // console.log(!!startVal[key]);
            startVal[key] = item;
          }
          
        });
      
      return startVal;
    }, allArgs[0]);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize is an expansive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    
    var memo = {};

    return function(){
      //var args = Array.prototype.slice.call(arguments);
      //var args = "'" + Array.prototype.slice.call(arguments) + "'";
        // [1, 2, 3] gets stored as '1,2,3'
      // var args = arguments;
        // gets stored in memo as 'object Arguments'
      var argToAdd = {};
      
      _.each(arguments, function(item, key){
          
          argToAdd[key] = item;
      });

      //http://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
      var args = JSON.stringify(argToAdd);

      if(args in memo){
        return memo[args]; //would return value a.k.a. 'result'
      } else{
        var result;
        result = func.apply(this, arguments);
        memo[args] = result;
        return result;
      }
    }
    
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var result;
    var args = Array.prototype.slice.call(arguments);
    // Have args not include func and wait
    var passArgs = args.slice(2, args.length);
    
    window.setTimeout(function(){
      result = func.apply(this, passArgs);
    }, wait);

    return result;
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
     var copyArr = Array.prototype.slice.call(array);

     return _.reduce(copyArr, function(startVal, item, key, collection){

      var newInd = Math.floor((Math.random(0, array.length - 1)) * (array.length - 1));

      var oldVal = copyArr[newInd];

      copyArr[key] = oldVal;

      copyArr[newInd] = item;

      return startVal;
     }, copyArr)
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
