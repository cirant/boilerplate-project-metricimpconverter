/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {

  this.getNum = function(input) {
    const reg = new RegExp(/\D+$/,'i');
    let [num] = input.split(reg);
    if(/\//.test(num)){
      const splited = num.split('/');
      if(splited.some(n=>isNaN(n))){
        return 'invalid number';
      };
      return splited.reduce((acc, act)=>acc/Number(act));
    } else {
      return Number(num) || 'invalid number';
    }
  };
  
  this.getUnit = function(input) {
    var unitsValid = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    const [matc] = input.match(/\D+$/i);
    return unitsValid.indexOf(matc) !== -1 ? matc : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    var lower = initUnit.toLowerCase();
    switch(lower){
      case 'gal': return 'l'; break;
      case 'l': return 'gal'; break;
      case 'mi': return 'km'; break;
      case 'km': return 'mi'; break;
      case 'lbs': return 'kg'; break;
      case 'kg': return 'lbs'; break;
      default: return 'invalid unit'; break;
    }
    
  };

  this.spellOutUnit = function(unit) {
    var result = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    }

    return result[unit] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit.toLowerCase()){
      case 'gal':
          result = Number((initNum * galToL));
        break;
      case 'l':
          result = Number((initNum / galToL));
        break;
      case 'mi':
          result = Number((initNum * miToKm));
        break;
      case 'km':
          result = Number((initNum / miToKm));
        break;
      case 'lbs':
          result = Number((initNum * lbsToKg));
        break;
      case 'kg':
          result = Number((initNum / lbsToKg));
        break;
      default: result = 'invalid unit'; break;
    }
    return Number(result.toFixed(5))
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
