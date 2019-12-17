/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {

    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });

    test('Decimal Input', function(done) {
      var input = '2.5L';
      assert.equal(convertHandler.getNum(input),2.5);
      done();
    });

    test('Fractional Input', function(done) {
      var input = '6/2L';
      assert.equal(convertHandler.getNum(input),3);
      done();
    });

    test('Fractional Input w/ Decimal', function(done) {
      var input = '2.5/2L';
      assert.equal(convertHandler.getNum(input),1.25);
      done();
    });

    test('Invalid Input (double fraction)', function(done) {
      var input = '2.5/2.5L';
      assert.equal(convertHandler.getNum(input),1);
      done();
    });

    test('No Numerical Input', function(done) {
      var input = 'stringL';
      assert.equal(convertHandler.getNum(input),'invalid number');
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      var input = ['2gal','56.6l','3/45mi','3km','43lbs','1kg','2GAL','3L','1MI','4.56KM','4.9LBS','43KG'];
      var matches = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), matches[i]);
      });
      done();
    });

    test('Unknown Unit Input', function(done) {
      var input = '34g';
      var matches = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gal','l','mi','km','lbs','kg', 'err'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms', 'invalid unit'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function() {

    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('L to Gal', function(done) {
      var input = [18.9271, 'l'];
      var expected = 5;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Mi to Km', function(done) {
      var input = [3, 'Mi'];
      var expected = 4.828;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Km to Mi', function(done) {
      var input = [3.22, 'Km'];
      var expected = 2;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Lbs to Kg', function(done) {
      var input = [10, 'lbs'];
      var expected = 4.54;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Kg to Lbs', function(done) {
      var input = [3, 'Kg'];
      var expected = 6.61;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

  });

});