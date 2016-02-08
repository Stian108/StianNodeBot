//Temp
var tempReg = /(-?\d+\.?\d*)[\s°]*(K|C|F)/i;

function temp(value, unit) {
  //Fix values
  value = parseFloat(value);
  unit = unit.toLowerCase();
  //Calculate and return
  var cTemp, fTemp, kTemp;
  switch (unit) {
    case 'f':
      fTemp = value;
      cTemp = (value - 32) / 1.8;
      kTemp = cTemp + 273.15;
      return fTemp + ' °F = ' + Math.round(cTemp*100)/100 + ' °C ';
    case 'c':
      cTemp = value;
      fTemp = value * 1.8 + 32;
      kTemp = cTemp + 273.15;
      return cTemp + ' °C = ' + Math.round(kTemp*100)/100 + ' °K';
    case 'k':
      kTemp = value;
      cTemp = kTemp - 273.15;
      fTemp = cTemp * 1.8 + 32;
      return kTemp + ' °K = ' + Math.round(cTemp*100)/100 + ' °C ';
    default:
      break;
  }
}

module.exports.trigger = 'temp';
module.exports.help = 'Syntax: temp [Value][Unit], Supports °C -> °K, °K -> °C, °F -> °C';

module.exports.run = function (input) {
   tempArray = tempReg.exec(input);
   if (tempArray !== null) {
     return temp(tempArray[1], tempArray[2]);
   } else {
     return 'Not valid! ';
   }
 };
