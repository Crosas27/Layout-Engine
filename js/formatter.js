function toFraction(inchesDecimal) {
  const rounded = Math.round(inchesDecimal * 8) / 8;
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;

  const fractions = {
    0: "",
    0.125: "1/8",
    0.25: "1/4",
    0.375: "3/8",
    0.5: "1/2",
    0.625: "5/8",
    0.75: "3/4",
    0.875: "7/8"
  };

  return { whole, fraction: fractions[fraction] || "" };
}

function formatFeetInches(decimalInches) {
  const feet = Math.floor(decimalInches / 12);
  const inches = decimalInches % 12;

  const { whole, fraction } = toFraction(inches);

  if (fraction && whole > 0)
    return `${feet}’ ${whole} ${fraction}”`;
  if (fraction)
    return `${feet}’ ${fraction}”`;
  return `${feet}’ ${whole}”`;
}
