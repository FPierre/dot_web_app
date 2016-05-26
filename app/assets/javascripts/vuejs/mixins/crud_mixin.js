var crudMixin = {
  methods: {
    getFieldModel: function (expression) {
      var arrayMatch = expression.match(/\w+\.(\w+)$/i)

      if (arrayMatch != null) {
        return arrayMatch[1]
      }
    }
  }
}
