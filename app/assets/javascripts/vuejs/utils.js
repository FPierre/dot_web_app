String.prototype.toSnakeCase = function () {
  return this.replace(/([A-Z])/g, function ($1) {
    return '_' + $1.toLowerCase()
  })
}

String.prototype.toCamelCase = function () {
  return this.replace(/((-|_)[a-z])/g, function ($1) {
    return $1[1].toUpperCase()
  })
}

String.prototype.toBoolean = function () {
  return (this == 'true' || this == 'on') ? true : false
}

// Met en forme le retour de l'API pour être compréhensible par Vue.js
function coerceProp(prop) {
  for (var index in prop) {
    if (prop.hasOwnProperty(index)) {
      var obj = prop[index]
      var props = {}

      if (obj.attributes === null) {
        continue
      }

      for (var key in obj.attributes) {
        if (obj.attributes.hasOwnProperty(key)) {
          var value = obj.attributes[key]

          props[key.toCamelCase()] = value
        }
      }

      obj.attributes = props
    }
  }

  return prop
}

function formatError(obj, apiErrors) {
  var props = []

  for (var prop in apiErrors) {
    if (prop != 'attributes' && apiErrors.hasOwnProperty(prop)) {
      // console.log(prop.toCamelCase())

      if (obj.hasOwnProperty(prop.toCamelCase())) {
        // console.log(apiErrors[prop])
        // props[prop.toCamelCase()] = apiErrors[prop]
        props.push(apiErrors[prop])
      }
      else if (obj.attributes.hasOwnProperty(prop.toCamelCase())) {
        // props[prop.toCamelCase()] = apiErrors[prop]
        props.push(apiErrors[prop])
      }
      else if (prop == 'droits') {
        // props[prop] = apiErrors[prop]
        props.push(apiErrors[prop])
      }
    }
  }

  // console.log(props)
  return props
}
