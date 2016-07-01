Vue.http.interceptors.push({
  request: function (request) {
    var data = request.data

    if (data !== '') {
      var props = {}

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var value = data[key]

          props[key.toSnakeCase()] = value
        }
      }

      request.data = props
    }

    var $csrfParam = $('head meta[name=csrf-param]')
    var $csrfToken = $('head meta[name=csrf-token]')

    if ($csrfParam.length && $csrfParam.attr('content') && $csrfToken.length && $csrfToken.attr('content')) {
      request['params'][$csrfParam.attr('content')] = $csrfToken.attr('content')
    }

    return request
  },
  response: function (response) {
    var data = response.data
    var props = { attributes: {} }

    if (data !== null && data.attributes !== null) {
      for (var key in data.attributes) {
        if (data.attributes.hasOwnProperty(key)) {
          var value = data.attributes[key]

          props[key.toCamelCase()] = value
        }
      }
    }

    response.data.attributes = props

    return response
  }
})
