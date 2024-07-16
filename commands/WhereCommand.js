const isMatch = require("lodash/isMatch")

class WhereCommand {
  constructor(conditions) {
    this.conditions = conditions
  }

  perform(objects) {
    return objects.filter((object) => {
      return isMatch(object, this.conditions)
    })
  }
}

module.exports = WhereCommand
