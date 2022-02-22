import type { RoundOffMethods } from "./RoundOffMethods";

function normalize(decimal: number, exponent: number) {
  if (decimal == 0) {
    return {
      decimal,
      exponent,
    }
  } else if (decimal < 1000000 && decimal > -1000000) {
    while (decimal < 1000000 && decimal > -1000000) {
      decimal *= 10;
      exponent -= 1;
    }
  } else {
    while (decimal > 9999999 || decimal < -9999999) {
      decimal /= 10;
      exponent += 1;
    }
  }

  return {
    decimal,
    exponent,
  }
}

function roundOff(round: RoundOffMethods, decimal: number) {
  switch (round.toString()) {
    case "Truncate":
      console.log('trunc', Math.trunc(decimal));
      return Math.trunc(decimal);

    case "RoundDown":
      console.log('down', Math.floor(decimal));
      return Math.floor(decimal);

    case "RoundUp":
      console.log('up', Math.ceil(decimal));
      return Math.ceil(decimal);

    case "RoundToNearest":
      console.log('nearest', Math.round(decimal / 2) * 2)
      return Math.round(decimal / 2) * 2;
  }

  return decimal
}

function getMSB(num: number) {
  num = Math.abs(num);
  while (num > 9) num /= 10;
  return Math.trunc(num).toString(2).padStart(4, "0");
}

function getEPrime(exp: number) {
  const ePrime = exp + 101;
  return ePrime.toString(2).padStart(8, "0");
}

function getCombiField(msb: string, ePrime: string) {
  const num = parseInt(msb, 2)
  if (num >= 0 && num <= 7)
    return ePrime.substring(0, 2) + msb.substring(1, 4);
  else
    return "11" + ePrime.substring(0, 2) + msb.charAt(3);
}

function PatternTable(msb: string) {
  switch (msb) {
    case "000":
      return "bcdfgh0jkm";
    case "001":
      return "bcdfgh100m";
    case "010":
      return "bcdjkh101m";
    case "011":
      return "bcd10h111m";
    case "100":
      return "jkdfgh110m";
    case "101":
      return "fgd01h111m";
    case "110":
      return "jkd00h111m";
    case "111":
      return "00d11h111m";
  }

  return "";
}

function keyDPBCD(digitBCD: string[], key: string) {
  switch (key) {
    case "a":
      return digitBCD[0][0];
    case "b":
      return digitBCD[0][1];
    case "c":
      return digitBCD[0][2];
    case "d":
      return digitBCD[0][3];

    case "e":
      return digitBCD[1][0];
    case "f":
      return digitBCD[1][1];
    case "g":
      return digitBCD[1][2];
    case "h":
      return digitBCD[1][3];

    case "i":
      return digitBCD[2][0];
    case "j":
      return digitBCD[2][1];
    case "k":
      return digitBCD[2][2];
    case "m":
      return digitBCD[2][3];

    case "1":
      return "1";
    case "0":
      return "0";
  }
}

function computeDPBCD(value: string) {
  let digitBCD: string[] = [];
  let temp;

  for (let i = 0; i < 3; i++) {
    temp = parseInt(value.charAt(i)).toString(2).padStart(4, "0");
    digitBCD.push(temp);
  }

  const msb = digitBCD[0][0] + digitBCD[1][0] + digitBCD[2][0];
  const pattern = PatternTable(msb);

  let ans = "";

  for (let i = 0; i < pattern.length; i++) {
    ans += keyDPBCD(digitBCD, pattern.charAt(i));
  }

  return ans;
}

function getDPBCD(decimal: number) {
  const value = Math.abs(decimal).toString().padStart(7, "0");
  const first3digits = value.substring(1, 4);
  const last3digits = value.substring(4, 7);

  return {
    first3Digits: computeDPBCD(first3digits),
    last3Digits: computeDPBCD(last3digits),
  }
}

function binaryToHexadecimal(fullBin: string) {
  let hexa = "";
  let cutoff = 0;
  let substring_bin = "";

  for (let i = 1; i <= 8; i++) {
    cutoff = i * 4;
    substring_bin = fullBin.substring(cutoff - 4, cutoff);
    hexa = hexa + parseInt(substring_bin, 2).toString(16);
  }

  return "0x" + hexa.toUpperCase();
}

export function convert(value: string, exponent: number, round: RoundOffMethods) {
  let decimal = Number(value);

  ({ decimal, exponent } = normalize(decimal, exponent));
  decimal = roundOff(round, decimal);
  ({ decimal, exponent } = normalize(decimal, exponent));

  const signBit = decimal >= 0 ? 0 : 1;
  let combiField, expContinuation, first3Digits = "0000000000", last3Digits;
  last3Digits = first3Digits;

  if (decimal === 0) {
    const ePrime = getEPrime(exponent)
    combiField = getCombiField('0000', ePrime)
    expContinuation = ePrime.substring(2);
  } else if (exponent > 90 || exponent < -101) {
    combiField = "11110";
    expContinuation = "000000";
  } else if (isNaN(decimal)) {
    combiField = "11111";
    expContinuation = "000000";
  } else {
    const msb = getMSB(decimal)
    const ePrime = getEPrime(exponent)
    combiField = getCombiField(msb, ePrime)
    expContinuation = ePrime.substring(2);
    ({ first3Digits, last3Digits } = getDPBCD(decimal))
  }

  const fullBin = signBit + combiField + expContinuation + first3Digits + last3Digits;

  return {
    bin: fullBin.match(/.{1,4}/g)!.join(' '),
    hex: binaryToHexadecimal(fullBin)
  }
}
