# objectpropvalidator

-Simple and smallest fine object properties validation checker with suggestions using console


## Features

* Simple and smallest size

* NodeJS compatible

* ExpressJS compatible

* Easy to use and short coding

* Small size (less than 3KB)

* Suggestion to validation (exact location)

* Custom configuration

* Custom logger configuration




## Installations

objectpropvalidator is available on [npmjs](https://www.npmjs.com/package/objectpropvalidator) (using semantic versioning), and can install via npm command.

```
npm install objectpropvalidator
```
or 

```
npm i objectpropvalidator
```
or

```
npm save objectpropvalidator
```

Or you can use CDN in your HTML file-

```html
<script src="https://cdn.jsdelivr.net/npm/objectpropvalidator@1.0.0/src/objectpropvalidator-v1.0.0.min.js""></script>
```
or

```html
<script src="https://cdn.jsdelivr.net/npm/objectpropvalidator@1.0.0/src/objectpropvalidator-v1.0.0.min.js""></script>
```

Or you can use locally downloaded file in your HTML file-

```html
<script src="./pathname/src/objectpropvalidator-v1.0.0.min.js"></script>
```


## How to use

-Simple to use

 ```html
 objectPropValidator(validationObject).(data)
 ```

 or 
With configuration object-
```html
objectPropValidator(validationObject,config).(data)
```


## Example

-If there has any error or invalid data, it will show error base on your configuration. Default error log via `console.error`

```html

<script src="./src/objectpropvalidator-v1.0.0.js"></script>

<script>
  
  // We check this data validity
  var data = {
    "props": {
      "user": {
        "name": "MAMEDUL ISLAM",
        "age": 26
      }
    }
  };

  var validationObject = { props: {
        user: {
          type: Object,
          required: true,
          validator: objectPropValidator({
            name: {
              type: String,
              required: true,
            },
            age: {
              type: Number,
              required: true,
              validator(value) {
                return value > 0;
              },
            },
          }),
        },
      }
    };

// Configurations
var config = {
    enabled: true, // Configuration enabled
    logLevel: 'log' // suggestion show via console.log
  };


objectPropValidator(validationObject,config)(data);

</script>
```



## Documentation

Check the [documentations here.](https://github.com/mamedul/objectpropvalidator/wiki)



## License

`objectpropvalidator` javascript library is Licensed under the [MIT license](https://github.com/mamedul/objectpropvalidator/blob/master/LICENSE).



## Contributing

The library is developed by [MAMEDUL ISLAM](https://mamedul.github.io).