# objectpropvalidator
-simple and fine object properties validation checker

## How to use
-Simple to use

 ```
 objectPropValidator(validationObject).(data)
 ```
 With configuration object-
```
objectPropValidator(validationObject,config).(data)
```

## Example
-If there has any error or invalid data, it will show error base on your configuration. Default error log via `console.error`

```html

<script src="./src/objectpropvalidator-v1.0.0.js"></script>

<script>
  
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

var config = {
    enabled: true,
    logLevel: 'log' //console.log
  };


objectPropValidator(validationObject,config).(data)

</script>
```
