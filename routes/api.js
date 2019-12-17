/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){

      try {
        var input = req.query.input;
        var initNum = convertHandler.getNum(input);
        var initUnit = convertHandler.getUnit(input);
        if(initUnit === 'invalid unit' && initNum === 'invalid number' ){
           throw new Error('invalid number and unit')
        } else if(initUnit === 'invalid unit'){
           throw new Error('invalid unit')
        } else if(initNum === 'invalid number'){
            const ref = new RegExp(`^${initUnit}$`);
          if(!ref.test(input)){
           throw new Error('invalid number')
          }
          else { initNum = 1 }
        }
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        res.status(200).json({initNum,initUnit,returnNum,returnUnit, "string": toString})
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    });
};
