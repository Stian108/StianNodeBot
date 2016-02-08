//Len
var lenReg =
/(\d+\.?\d*)\s?(ly|mile[s]?|mi|inch(?:es)?|in|"|''|foot|feet|ft|'|yard[s]?|yd)\s?((\d+\.?\d*)\s?("|in|inch(?:es)?|''))?/i;

function len(value, unit, valueY, unitY) {
  //Fix values
  value = parseFloat(value);
  if (isNaN(valueY)) {
    valueY = '';
  } else {
    valueY = parseFloat(valueY);
  }

  unit = unit.toLowerCase();
  if (unitY === undefined) {
    unitY = '';
  } else {
    unitY = unitY.toLowerCase();
  }
  //Calculate
  var meter;
  switch (unit) {
    case 'mile':
    case 'miles':
    case 'mi':
      meter = value / 0.00062137;
      break;
    case 'inch':
    case 'inches':
    case 'in':
    case '"':
    case "''":
      meter = value / 39;
      break;
    case 'foot':
    case 'feet':
    case 'ft':
    case "'":
      meter = value / 3.2808;
      break;
    case 'yard':
    case 'yards':
    case 'yd':
      meter = value / 1.0936;
      break;
    case 'ly':
      meter = value * 9.461e15;
      break;
    default:
      break;
  }
  switch (unitY) {
    case '"':
    case "''":
    case 'in':
    case 'inch':
    case 'inches':
      meter += valueY / 39;
      break;
    default:
      break;
  }
  //Set prefix and return
  if (meter >= 1000) {
    return value + unit + ' ' + valueY + unitY + ' = ' + Math.round(meter/1000 *100)/100 + 'km';
  } else if (meter < 1 && meter >= 0.01) {
    return value + unit + ' ' + valueY + unitY + ' = ' + Math.round(meter*100 *100)/100 + 'cm';
  } else if (meter < 0.01) {
    return value + unit + ' ' + valueY + unitY + ' = ' + Math.round(meter*1000 *100)/100 + 'mm';
  } else {
    return value + unit + ' ' + valueY + unitY + ' = ' + Math.round(meter *100)/100 + 'm';
  }
}

module.exports.trigger = 'len';
module.exports.help    = 'Syntax: len [Value][Unit], converts in, mi, ft, yd and ly to meters';

module.exports.run = function (input) {
    lenArray = lenReg.exec(input);
    if (lenArray !== null) {
      return len(lenArray[1], lenArray[2], lenArray[4], lenArray[5]);
    } else {
      return 'Not valid! ';
    }
};
