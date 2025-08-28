/**
 * objectPropValidator - A simple, recursive object property validator.
 * This returns true/false and logs specific errors on failure.
 *
 * Copyright (c) 2022 by MAMEDUL ISLAM (https://mamedul.github.io/)
 *
 * Licensed under the MIT license:
 *   https://opensource.org/licenses/MIT
 *
 * Project home:
 *   https://mamedul.github.io/objectpropvalidator
 * 
 * Version: 2.0.0
 */
/**
 * @param {object} schema - The validation schema object. Rules for each property
 * are defined here (e.g., type, required, validator).
 * @param {object} [config={}] - Optional configuration settings.
 * @param {string} [config.logLevel='error'] - The console method for logging errors
 * ('error', 'warn', 'log').
 * @returns {function(object): boolean} A new validator function that checks an
 * object against the schema.
 */
function objectPropValidator(schema, config = {}) {
  // Use the specified console method, or default to console.error
  // Added error-safe check for the existence of the console method
  const log = (console && console[config.logLevel]) || (console && console.error) || (() => {});

  /**
   * Gets a reliable string name for a value's type.
   * @param {*} value The value to check.
   * @returns {string} The type name (e.g., 'String', 'Object', 'Null').
   */
  const getTypeName = (value) => {
    if (value === null) return 'Null';
    if (value === undefined) return 'Undefined';
    // .constructor.name is robust for standard JS types, but can throw errors on some host objects or proxies.
    try {
      return value.constructor.name;
    } catch (e) {
      // Fallback for cases where .constructor.name is not accessible
      return Object.prototype.toString.call(value).slice(8, -1);
    }
  };

  // The returned validator function
  return function validator(data) {
    let isOverallValid = true;

    // A type check on the data parameter itself
    if (data === null || typeof data !== 'object') {
        log(`[Validation Error] Invalid data provided. Expected 'Object' but received '${getTypeName(data)}'.`);
        return false;
    }

    // Iterate over each rule in the schema
    for (const key in schema) {
      const rules = schema[key];
      // Safely access the value from the data object, even if data is null/undefined
      const value = Object.prototype.hasOwnProperty.call(data, key) ? data[key] : undefined;
      // Added check to ensure rules is a valid object
      if (!rules || typeof rules !== 'object') {
          log(`[Schema Error] Invalid schema rule for property '${key}'. Expected 'Object'.`);
          isOverallValid = false;
          continue;
      }

      // 1. Required check: Fails if the rule is 'required' and value is undefined.
      if (rules.required && value === undefined) {
        log(`[Validation Error] Missing required property: '${key}'`);
        isOverallValid = false;
        continue; // Skip other checks for this missing key
      }

      // If a property isn't required and is missing, we can ignore it.
      if (value === undefined) {
        continue;
      }

      // 2. Type check: Fails if the value's type doesn't match the rule.
      if (rules.type) {
        // Standardize the rule to an array to handle single or multiple types
        const expectedTypes = Array.isArray(rules.type) ? rules.type : [rules.type];
        const expectedTypeNames = expectedTypes.map(t => t.name);
        const actualTypeName = getTypeName(value);

        if (!expectedTypeNames.includes(actualTypeName)) {
          const expected = expectedTypeNames.join(' or ');
          log(`[Validation Error] Invalid type for property '${key}'. Expected '${expected}' but received '${actualTypeName}'.`);
          isOverallValid = false;
        }
      }

      // 3. Custom validator check: Fails if the custom function returns false.
      // This is how recursive validation is handled.
      if (typeof rules.validator === 'function') {
        try {
            // The custom/nested validator is responsible for its own specific logging.
            // We just check its final boolean result.
            if (!rules.validator(value)) {
              isOverallValid = false;
            }
        } catch (e) {
            log(`[Validator Error] An exception occurred while executing custom validator for property '${key}': ${e.message}`);
            isOverallValid = false;
        }
      }
    }

    return isOverallValid;
  };
}

// Module export for Node.js or modules compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = objectPropValidator;
}
