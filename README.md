# objectPropValidator: Simple, Recursive JavaScript Object Validation

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/mamedul/objectpropvalidator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Love in Bangladesh](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20in-Bangladesh-green.svg)](https://mamedul.github.io/)
[![Hire Me](https://img.shields.io/badge/Hire%20Me-Available-brightgreen.svg)](https://mamedul.github.io/)

**objectPropValidator** is a lightweight, zero-dependency JavaScript utility for validating object properties against a defined schema. It's designed to be simple, flexible, and powerful, allowing for recursive validation of nested objects with clear, helpful error messages.

Whether you're validating API responses, configuration objects, or function arguments, this library ensures your data structure is correct without adding bloat to your project.

---

## Core Features

* ✅ **Schema-Based Validation**: Define a clear and reusable schema for your objects.
* recursi **Recursive/Nested Validation**: Effortlessly validate complex, nested object structures.
* 💪 **Flexible Rules**: Check for property `type`, whether it's `required`, and add your own custom `validator` functions.
* 🎯 **Specific Error Logging**: Get clear, actionable error messages in the console that pinpoint exactly what failed.
* 🕊️ **Lightweight & Zero-Dependency**: Tiny footprint. No external libraries needed.
* 🌐 **Universal Compatibility**: Works in modern browsers and Node.js environments.

---

## Installation

You can use `objectPropValidator` by directly including the script in your HTML.

```html
<script src="https://cdn.jsdelivr.net/gh/mamedul/objectpropvalidator@main/dist/objectpropvalidator.min.js"></script>
```

*(Note: Once published to npm, installation instructions for `npm install objectpropvalidator` would go here.)*

---

## Quick Start: Basic Usage

Getting started is simple. Just define a schema and create a validator function from it.

1.  **Define a `schema`** that describes the expected structure of your object.
2.  **Call `objectPropValidator(schema)`** to create a reusable validator function.
3.  **Use the new function** to check your data object. It returns `true` or `false`.

```javascript
// 1. Define the validation schema
const userSchema = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false // This property is optional
  },
  age: {
    type: Number,
    required: true,
    // Add a custom validator function for more complex logic
    validator(value) {
      const isValid = value >= 18;
      if (!isValid) {
        console.error("[Validation Error] User must be 18 or older.");
      }
      return isValid;
    }
  }
};

// 2. Create a reusable validator function
const validateUser = objectPropValidator(userSchema);

// 3. Test it with some data
const validUser = {
  name: "Mamedul Islam",
  age: 26
};

const invalidUser = {
  name: 12345, // Wrong type
  // 'age' is missing
};

console.log("Is the first user valid?", validateUser(validUser)); // true

console.log("Is the second user valid?", validateUser(invalidUser)); // false
// Console will show:
// [Validation Error] Invalid type for property 'name'. Expected 'String' but received 'Number'.
// [Validation Error] Missing required property: 'age'
```

---

## Advanced Usage

### Nested Object Validation

The real power of `objectPropValidator` comes from its ability to handle nested objects recursively. Simply set the `validator` property to another validator instance.

```javascript
// Schema for a user object
const userValidator = objectPropValidator({
  id: { type: Number, required: true },
  username: { type: String, required: true }
});

// Schema for a blog post, which includes a nested 'author' object
const postSchema = {
  title: {
    type: String,
    required: true
  },
  author: {
    type: Object,
    required: true,
    validator: userValidator // Use the user validator here!
  }
};

const validatePost = objectPropValidator(postSchema);

const validPost = {
  title: "My First Post",
  author: {
    id: 1,
    username: "mamedul"
  }
};

const invalidPost = {
    title: "Another Post",
    author: {
        id: "2" // Invalid type, should be Number
    }
};

console.log(validatePost(validPost));   // true
console.log(validatePost(invalidPost)); // false
// Console will show:
// [Validation Error] Invalid type for property 'id'. Expected 'Number' but received 'String'.
```

### Configuring Error Logs

You can pass a configuration object as the second argument to control how errors are logged.

```javascript
const config = {
  logLevel: 'warn' // Use console.warn instead of the default console.error
};

const myValidator = objectPropValidator(mySchema, config);
```

* **`logLevel`**: Can be `'error'` (default), `'warn'`, or `'log'`.

---

## API Reference

### `objectPropValidator(schema, [config])`

Creates and returns a new validator function.

* **`schema`** `(Object)`: An object where each key is a property to validate. The value is an object containing the validation rules.
* **`config`** `(Object, optional)`: Configuration options.
    * **`logLevel`** `(String)`: Sets the console logging method. Defaults to `'error'`.

### Schema Rule Properties

For each property in your `schema`, you can define the following rules:

* **`type`** `(Constructor | Array<Constructor>)`: The expected type (e.g., `String`, `Number`, `Object`, `Array`). You can also provide an array for multiple allowed types, like `[String, Number]`.
* **`required`** `(Boolean)`: If `true`, the property must exist in the object being validated.
* **`validator`** `(Function)`: A custom function that receives the property's value and should return `true` if valid, and `false` otherwise. This is also the mechanism for nested validation.

---

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on the [GitHub repository](https://github.com/mamedul/objectpropvalidator).

---

## License

This plugin is licensed under the **MIT License**. Copyright (c) 2022 by [**Mamedul Islam**](https://mamedul.github.io/).

See the [LICENSE](https://opensource.org/licenses/MIT) file for more details.

---

## Author & Hire Me

This plugin was created and is maintained by [**Mamedul Islam**](https://mamedul.github.io/).


I am a passionate **web developer** with experience in creating interactive and user-friendly web components. I am currently *available for freelance projects* or full-time opportunities.

I help businesses grow their online presence with custom web solutions. Specializing in **WordPress**, **WooCommerce**, and **Shopify**, I build modern, responsive, and high-performance websites.

* **WhatsApp**: [message me](https://wa.me/8801847406830?text=Hi%2C%20I%27d%20like%20to%20hire%20you.)
* **Portfolio**: [mamedul.github.io](https://mamedul.github.io/)
* **GitHub**: [@mamedul](https://github.com/mamedul)
* **LinkedIn**: [Connect with me!](https://www.linkedin.com/in/mamedul/)
* **Twitter (X)**: [@mamedul](https://www.x.com/mamedul/)

[![Hire Me](https://img.shields.io/badge/Hire%20Me-Available-brightgreen.svg)](https://mamedul.github.io/)

---

### Show Your Support

If you find this extension useful, please consider giving it a star on GitHub! Your support helps motivate further development and improvements.

[![GitHub stars](https://img.shields.io/github/stars/mamedul/jquery-scrollpaging?style=for-the-badge)](https://github.com/mamedul/jquery-scrollpaging/stargazers) &nbsp;

If you found this project helpful, give it a ⭐ on GitHub!
