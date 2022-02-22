
import { RoundOffMethods } from "./RoundOffMethods";

let decimal = 0;
let exponent = 0;

let mostSigBit = 0;
let ePrimeBinary = "0";
let significantBitBinary = "0";

let signBit = "0";
let combiField = "0";
let expContinuation = "0";
let first3digitsDPBCD = "0";
let last3digitsDPBCD = "0";

let roundOffMethod = RoundOffMethods.Truncate;

function normalize() {
  if (decimal < 1000000.0 && decimal > -1000000.0)
    while (decimal < 1000000.0 && decimal > -1000000.0) {
      decimal *= 10;
      exponent -= 1;
    }
  else
    while (decimal > 9999999 || decimal < -9999999) {
      decimal /= 10;
      exponent += 1;
    }
}

function roundEven() {
  return Math.round(decimal / 2) * 2;
}

function roundOff() {
  switch (roundOffMethod) {
    case RoundOffMethods.Truncate:
      decimal = Math.trunc(decimal);
      break;
    case RoundOffMethods.RoundDown:
      decimal = Math.floor(decimal);
      break;
    case RoundOffMethods.RoundUp:
      decimal = Math.ceil(decimal);
      break;
    case RoundOffMethods.RoundToNearest:
      decimal = roundEven();
      break;
  }
}

function msbToBinary() {
  mostSigBit = Math.abs(decimal);

  while (mostSigBit > 9) mostSigBit /= 10;

  significantBitBinary = mostSigBit.toString(2);
}

function computeEPrime() {
  let ePrime = exponent + 101;
  ePrimeBinary = ePrime.toString(2);

  while (ePrimeBinary.length < 8) ePrimeBinary = "0" + ePrimeBinary;
}

function determineCombiField() {
  if (mostSigBit >= 0 && mostSigBit <= 7)
    combiField =
      ePrimeBinary.substring(0, 2) + significantBitBinary.substring(1, 4);
  else
    combiField =
      "11" + ePrimeBinary.substring(0, 2) + significantBitBinary.charAt(3);
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

function keyDPBCD(digitBCD: String[][], key: String) {
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
  let digitBCD: string[][] = [];
  let temp = "";
  for (let i = 0; i < 3; i++) {
    temp = parseInt(value.charAt(i)).toString(2);

    for (let j = 0; j < 4; j++) {
      digitBCD[i][j] = temp.charAt(j);
    }
  }

  let msb = digitBCD[0][0] + digitBCD[1][0] + digitBCD[2][0];
  let pattern = PatternTable(msb);

  let ans = "";

  for (let i = 0; i < pattern.length; i++) {
    ans = ans + keyDPBCD(digitBCD, pattern.charAt(i));
  }

  return ans;
}

function determineDPBCD() {
  let value = Math.abs(decimal).toString();

  let last3digits = value.substring(4, 7);
  let first3digits = value.substring(1, 4);

  first3digitsDPBCD = computeDPBCD(first3digits);
  last3digitsDPBCD = computeDPBCD(last3digits);
}

function binaryToHexadecimal() {
  let fullBin =
    signBit +
    combiField +
    expContinuation +
    first3digitsDPBCD +
    last3digitsDPBCD;
  let hexa = "0x";
  let cutoff = 0;
  let substring_bin = "";

  for (let i = 1; i <= 8; i++) {
    cutoff = i * 4;
    substring_bin = fullBin.substring(cutoff - 4, cutoff);
    hexa = hexa + parseInt(substring_bin, 2).toString(16);
  }

  return hexa;
}
function convert(value: string, exp: number, round: RoundOffMethods) {
  decimal = Number(value);
  exponent = exp;
  roundOffMethod = round;

  normalize();
  roundOff();
  normalize();

  if (decimal > 0) signBit = "0";
  else signBit = "1";

  if (exponent > 90 || exponent < -101) {
    combiField = "11110";
    expContinuation = "000000";
    first3digitsDPBCD = "0000000000";
    last3digitsDPBCD = "0000000000";
  } else if (isNaN(decimal)) {
    combiField = "11111";
    expContinuation = "000000";
    first3digitsDPBCD = "0000000000";
    last3digitsDPBCD = "0000000000";
  } else {
    msbToBinary();
    computeEPrime();
    determineCombiField();
    expContinuation = ePrimeBinary.substring(2);
    determineDPBCD();

    binaryToHexadecimal();
  }

  return (
    signBit +
    combiField +
    expContinuation +
    first3digitsDPBCD +
    last3digitsDPBCD
  );
}

export function decimalTo32Float(decimal: string, exponent: string, roundOff: RoundOffMethods) {
  return convert(decimal, parseInt(exponent), roundOff);
}

export function decimalTo32FloatHexadecimal(
  decimal: string,
  exponent: string,
  roundOff: RoundOffMethods
) {
  convert(decimal, parseInt(exponent), roundOff);

  return binaryToHexadecimal();
}
