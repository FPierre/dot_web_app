// Formate la date en Francais
Vue.filter('frDatetime', function (value) {
  var date  = new Date(value)
  var day   = date.getDay()
  var month = date.getMonth()

  return ((day < 10) ? '0' + day : day) + '/' + ((month < 10) ? '0' + month : month) + '/' + date.getFullYear()
})
