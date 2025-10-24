export const lengthUnits = [
  { value: "meter", label: "Meters (m)" },
  { value: "kilometer", label: "Kilometers (km)" },
  { value: "mile", label: "Miles (mi)" },
  { value: "foot", label: "Feet (ft)" },
  { value: "inch", label: "Inches (in)" },
  { value: "centimeter", label: "Centimeters (cm)" },
];

export const lengthRates = {
  meter: 1,
  kilometer: 0.001,
  mile: 0.000621371,
  foot: 3.28084,
  inch: 39.3701,
  centimeter: 100,
};

export const weightUnits = [
  { value: "kilogram", label: "Kilograms (kg)" },
  { value: "gram", label: "Grams (g)" },
  { value: "pound", label: "Pounds (lb)" },
  { value: "ounce", label: "Ounces (oz)" },
  { value: "ton", label: "Metric Tons (t)" },
];

export const weightRates = {
  kilogram: 1,
  gram: 1000,
  pound: 2.20462,
  ounce: 35.274,
  ton: 0.001,
};

export const temperatureUnits = [
  { value: "celsius", label: "Celsius (°C)" },
  { value: "fahrenheit", label: "Fahrenheit (°F)" },
  { value: "kelvin", label: "Kelvin (K)" },
];

// Temperature needs special handling
export const convertTemperature = (value: number, from: string, to: string): number => {
  let celsius: number;
  
  // Convert to Celsius first
  switch (from) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = (value - 32) * 5/9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }
  
  // Convert from Celsius to target
  switch (to) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return celsius * 9/5 + 32;
    case "kelvin":
      return celsius + 273.15;
    default:
      return celsius;
  }
};

export const timeUnits = [
  { value: "second", label: "Seconds (s)" },
  { value: "minute", label: "Minutes (min)" },
  { value: "hour", label: "Hours (h)" },
  { value: "day", label: "Days (d)" },
  { value: "week", label: "Weeks (wk)" },
];

export const timeRates = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
};

export const volumeUnits = [
  { value: "liter", label: "Liters (L)" },
  { value: "milliliter", label: "Milliliters (mL)" },
  { value: "gallon", label: "Gallons (gal)" },
  { value: "cup", label: "Cups" },
  { value: "cubicMeter", label: "Cubic Meters (m³)" },
];

export const volumeRates = {
  liter: 1,
  milliliter: 1000,
  gallon: 0.264172,
  cup: 4.22675,
  cubicMeter: 0.001,
};
