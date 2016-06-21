String.prototype.toSnakeCase = function () {
  return this.replace(/([A-Z])/g, function ($1) {
    return '_' + $1.toLowerCase()
  })
}

String.prototype.toCamelCase = function () {
  return this.replace(/(-[a-z])/g, function ($1) {
    return $1[1].toUpperCase()
  })
}

String.prototype.toBoolean = function () {
  return (this == 'true' || this == 'on') ? true : false
}

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
