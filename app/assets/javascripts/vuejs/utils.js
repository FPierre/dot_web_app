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
