(function() {
  'use strict';

  window._ = {};

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
    // Test is used in case iterator is not assigned
    var test = iterator || _.identity;
    return _.reduce(collection, function(startVal, item){
      // if an iterator exists then that's what will go here, if not then iterator is the value of identity(item) ==> item
      return startVal && !!test(item)
    }, true);
  };

 
  _.some = function(collection, iterator) {
    var test = iterator || _.identity;

    return _.reduce(collection, function(startVal, item){
    
      if(test(item)){
        return true;
      }

      return startVal;
    }, false);

  };

  _.extend = function(obj) {
    var allArgs = arguments;

    return _.reduce(allArgs, function(startVal, indObj, key, collection){
        _.each(indObj, function(item, key){
          startVal[key] = item;
        });
      
      return startVal;
    }, allArgs[0]);

  };

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

  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  _.memoize = function(func) {
    
    var memo = {};

    return function(){
      var argToAdd = {};
      
      _.each(arguments, function(item, key){
          
          argToAdd[key] = item;
      });

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


  _.invoke = function(collection, functionOrKey, args) {
      var args = Array.prototype.slice.call(arguments, 2);

      if(typeof functionOrKey == 'function'){
        return _.map(collection, function(item, index){
          return functionOrKey.apply(item, args);
        });
      }else{
        return _.map(collection, function(item, index){
          return item[functionOrKey].apply(item, args);
        });
      }
    
  };