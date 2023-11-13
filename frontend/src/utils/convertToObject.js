export const convertToObject = (input) => {
  const output = {};

  for (const key in input) {
    let value = input[key];
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch (error) {
        // Not a valid JSON string, keep the original value
      }
    }

    output[key] = value;
  }

  return output;
};
