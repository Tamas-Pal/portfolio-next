const rangeMap = function (
  input: number,
  inputRangeFloor: number,
  inputRangeCeil: number,
  outputRangeFloor: number,
  outputRangeCeil: number
) {
  const output =
    ((input - inputRangeFloor) / (inputRangeCeil - inputRangeFloor)) *
      (outputRangeCeil - outputRangeFloor) +
    outputRangeFloor;
  return output;
};

export default rangeMap;
