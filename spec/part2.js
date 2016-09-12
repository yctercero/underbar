(function() {
  'use strict';

  describe('Part II', function() {

    describe('contains', function() {
      checkForNativeMethods(function() {
        _.contains([4, 5, 6], 2);
      });

      it('should be a function', function() {
        expect(_.contains).to.be.an.instanceOf(Function);
      });

      it('should not mutate the input array', function() {
        var input = [1,2,3,4,5];
        var result = _.contains(input, 4);

        expect(input).to.eql([1,2,3,4,5])
      });

      it('should return true given an array and a value from that array', function(){
        var array = [1,2,3];
        var value = 1;
        expect(_.contains(array, value)).to.be.true;
      });

      it('should return false given an array and a value not in that array', function(){
        var array = [1,2,3];
        var value = 4;
        expect(_.contains(array, value)).to.be.false;
      });

      it('should return true given a object and a value from that object', function(){
        var object = { a: 1, b: 2, c: 3 };
        var value = 1;
        expect(_.contains(object, value)).to.be.true;
      });

      it('should return false given an object and a value not in that object', function(){
        var object = { a: 1, b: 2, c: 3 };
        var value = 4;
        expect(_.contains(object, value)).to.be.false;
      });
    });

    describe('every', function() {
      var isEven = function(num) {
        return num % 2 === 0;
      };

      checkForNativeMethods(function() {
        _.every([4, 5, 6], _.identity);
      });

      it('passes by default for an empty collection', function() {
        expect(_.every([], _.identity)).to.be.true;
      });

      it('passes for a collection of all-truthy results', function() {
        expect(_.every([true, {}, 1], _.identity)).to.be.true;
      });

      it('fails for a collection of all-falsy results', function() {
        expect(_.every([null, 0, undefined], _.identity)).to.be.false;
      });

      it('fails for a collection containing mixed falsy and truthy results', function() {
        expect(_.every([true, false, 1], _.identity)).to.be.false;
        expect(_.every([1, undefined, true], _.identity)).to.be.false;
      });

      it('should work when provided a collection containing undefined values', function() {
        expect(_.every([undefined, undefined, undefined], _.identity)).to.be.false;
      });

      it('should cast the result to a boolean', function() {
        expect(_.every([1], _.identity)).to.be.true;
        expect(_.every([0], _.identity)).to.be.false;
      });

      it('should handle callbacks that manipulate the input', function() {
        expect(_.every([0, 10, 28], isEven)).to.be.true;
        expect(_.every([0, 11, 28], isEven)).to.be.false;
      });

      it('should work when no callback is provided', function() {
        expect(_.every([true, true, true])).to.be.true;
        expect(_.every([true, true, false])).to.be.false;
        expect(_.every([false, false, false])).to.be.false;
      });
    });

    describe('some', function() {
      var isEven = function(number){
        return number % 2 === 0;
      };

      checkForNativeMethods(function() {
        _.some([4, 5, 6], _.identity);
      });

      it('should fail by default for an empty collection', function() {
        expect(_.some([])).to.be.false;
      });

      it('should pass for a collection of all-truthy results', function() {
        expect(_.some([true, {}, 1], _.identity)).to.be.true;
      });

      it('should fail for a collection of all-falsy results', function() {
        expect(_.some([null, 0, undefined], _.identity)).to.be.false;
      });

      it('should pass for a collection containing mixed falsy and truthy results', function() {
        expect(_.some([true, false, 1], _.identity)).to.be.true;
      });

      it('should pass for a set containing one truthy value that is a string', function() {
        expect(_.some([null, 0, 'yes', false], _.identity)).to.be.true;
      });

      it('should fail for a set containing no matching values', function() {
        expect(_.some([1, 11, 29], isEven)).to.be.false;
      });

      it('should pass for a collection containing one matching value', function() {
        expect(_.some([1, 10, 29], isEven)).to.be.true;
      });

      it('should cast the result to a boolean', function() {
        expect(_.some([1], _.identity)).to.be.true;
        expect(_.some([0], _.identity)).to.be.false;
      });

      it('should work when no callback is provided', function() {
        expect(_.some([true, true, true])).to.be.true;
        expect(_.some([true, true, false])).to.be.true;
        expect(_.some([false, false, false])).to.be.false;
      });
    });

    describe('extend', function() {
      checkForNativeMethods(function() {
        _.extend({ a: 1 },{ b: 1 }, { c: 1 });
      });

      it('returns the first argument', function() {
        var destination = {};
        var source = {};
        var extended = _.extend(destination, source);

        expect(extended).to.equal(destination);
      });

      it('should extend an object with the attributes of another', function() {
        var destination = {};
        var source = { a: 'b' };
        var extended = _.extend(destination, source);

        expect(extended.a).to.equal('b');
      });

      it('should override properties found on the destination', function() {
        var destination = { a: 'x' };
        var source = { a: 'b' };
        var extended = _.extend(destination, source);

        expect(extended.a).to.equal('b');
      });

      it('should not override properties not found in the source', function() {
        var destination = { x: 'x' };
        var source = { a: 'b' };
        var extended = _.extend(destination, source);

        expect(extended.x).to.equal('x');
      });

      it('should extend from multiple source objects', function() {
        var extended = _.extend({ x: 1 }, { a: 2 }, { b:3 });

        expect(extended).to.eql({ x: 1, a: 2, b: 3 });
      });

      it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
        var extended = _.extend({ x: 'x' }, { a: 'a', x: 2 }, { a: 1 });

        expect(extended).to.eql({ x: 2, a: 1 });
      });
    });

    describe('defaults', function() {
      checkForNativeMethods(function() {
        _.defaults({ a: 1 },{ b: 1 }, { c: 1 });
      });

      it('should be a function', function() {
        expect(_.defaults).to.be.an.instanceOf(Function);
      });

      it('should return the original target object', function() {

        var destination = {};
        var source = {};
        var defaulted = _.defaults(destination, source);

        expect(defaulted).to.equal(destination); // .equal uses (===) under the hood
      });

      it('should copy a property if that key is not already set on the target', function() {

        var destination = {};
        var source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
      });

      it('should copy any property whose key is not already set on the target', function() {
        var destination = {};
        var source = { a: 1, b: 2, c: 'three' };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal('three');
      });

      it('should not copy a property if that key is already set on the target', function() {
        var destination = { a: 10 };
        var source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(10);
      });

      it('should not copy any property whose key is already set on the target', function() {
        var destination = { a: 1, b: 2 };
        var source = { a: 100, b: 200, c: 300 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal(300);
      });

      it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', function() {

        var destination = {a: '', b: 0, c: NaN };
        var source = { a: 1, b: 2, c: 3 };

        _.defaults(destination, source);

        expect(destination.a).to.equal('')
        expect(destination.b).to.equal(0);
        expect(isNaN(destination.c)).to.equal(true)
      });

      it('should copy properties source an arbitrary number of source objects', function() {
        var destination = {};
        var source = { a: 1 };
        var anotherSource = { b: 2, c: 'three' };
        var aThirdSource = { d: 'four' };

        _.defaults(destination, source, anotherSource, aThirdSource);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal('three');
        expect(destination.d).to.equal('four');
      });

      it('should prefer the first value found when two objects are provided with properties at the same key', function() {
        var destination = {};
        var source = { a: 1 };
        var anotherSource = { a: 'one' };

        _.defaults(destination, source, anotherSource);

        expect(destination.a).to.equal(1);
      });
    });

    describe('once', function() {
      checkForNativeMethods(function() {
        var num = 0;
        var increment = _.once(function() {
          num += 1;
        });
      });

      it('should be a function', function() {
        expect(_.once).to.be.an.instanceOf(Function);
      });

      it('should return a function', function() {
        var noop = _.once(function() {});

        expect(noop).to.be.an.instanceOf(Function);
      })

      it('should only run a user-defined function if it has not been run before', function() {
        var num = 0;
        var increment = _.once(function() {
          num++;
        });

        increment();
        increment();
        increment();

        expect(num).to.equal(1);
      });

      it('should apply arguments to the user-defined function', function() {
        var add = _.once(function(x,y,z) {
          return x + y + z;
        });

        expect(add(1, 2, 3)).to.equal(6);
      });

      it('should return the result of the first call for every subsequent call', function() {
        var add = _.once(function(x,y,z) {
          return x + y + z;
        });

        expect(add(1,2,3)).to.equal(6);
        expect(add(4,5,6)).to.equal(6);
        expect(add(7,8,9)).to.equal(6);
      });
    });

    describe('memoize', function() {
      var add, memoAdd;

      beforeEach(function() {
        add = function(a, b) {
          return a + b;
        };

        memoAdd = _.memoize(add);
      });

      checkForNativeMethods(function() {
        _.memoize(function add(a, b) {
          return a + b;
        });
      })

      it('should produce the same result as the non-memoized version', function() {
        expect(add(1, 2)).to.equal(3);
        expect(memoAdd(1, 2)).to.equal(3);
      });

      it('should give different results for different arguments', function() {
        expect(memoAdd(1, 2)).to.equal(3);
        expect(memoAdd(3, 4)).to.equal(7);
        expect(memoAdd(1, 3)).to.equal(4);
      });

      it('should not run the memoized function twice when given a primitive type as an argument', function() {

        var spy = sinon.spy(function() { return 'Dummy output'; });
        var memoSpy = _.memoize(spy);

        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
      });
      
      it('should not run the memoized function twice when given a reference type as an argument', function() {
        var spy = sinon.spy(function() { return 'Dummy output'; });
        var memoSpy = _.memoize(spy);

        memoSpy([1,2,3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy([1,2,3]);
        expect(spy).to.have.been.calledOnce;
      });

      it('should run the memoized function twice when given an array and then given a list of arguments', function() {
        var spy = sinon.spy(function() { return 'Dummy output'; });
        var memoSpy = _.memoize(spy);

        memoSpy([1,2,3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy(1,2,3);
        expect(spy).to.have.been.calledTwice;
      });
    });

    describe('delay', function() {
      var callback;

      beforeEach(function() {
        callback = sinon.spy();
      })

      checkForNativeMethods(function() {
        _.delay(callback, 100);
      })

      it('should only execute the function after the specified wait time', function() {
        _.delay(callback, 100);
        clock.tick(99);

        expect(callback).to.have.not.been.called;

        clock.tick(1);

        expect(callback).to.have.been.calledOnce;
      });

      it('should have successfully passed function arguments in', function() {
        _.delay(callback, 100, 1, 2);
        clock.tick(100);

        expect(callback).to.have.been.calledWith(1, 2);
      });
    });

    describe('shuffle', function() {
      checkForNativeMethods(function() {
        _.shuffle([1, 2, 3, 4])
      })

      it('should not modify the original object', function() {
        var numbers = [4, 5, 6];
        var shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.not.equal(numbers);
        expect(numbers).to.eql([4, 5, 6]);
      });

      it('should have the same elements as the original object', function() {
        var numbers = [4, 5, 6];
        var shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.eql([4, 5, 6]);
      });

      it('should not be in the same order as the original object', function() {
        var numbers = [4, 5, 6, 7, 8, 9, 10];
        var shuffled = _.shuffle(numbers);

        expect(shuffled).to.not.eql([4, 5, 6, 7, 8, 9, 10]);
      });

    });

  });

  function checkForNativeMethods(runUnderbarFunction) {
    it('should not use the native version of any underbar methods in its implementation', function() {
      runUnderbarFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
    });
  }
}());
