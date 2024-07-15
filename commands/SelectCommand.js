const Table = require("../Table")

class SelectCommand {
  constructor({ tableName, columns, allColumns }) {
    this.table = new Table(tableName)
    this.columns = columns
    this.allColumns = allColumns
  }

  async perform() {}
}

module.exports = SelectCommand
