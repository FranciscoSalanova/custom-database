const pick = require("lodash/pick")
const Table = require("../Table")

class SelectCommand {
  constructor({ tableName, columns, allColumns }) {
    this.table = new Table(tableName)
    this.columns = columns
    this.allColumns = allColumns
  }

  async perform(whereCommand) {
    let data = await this.table.readData()
    if (whereCommand) data = whereCommand.perform(data)
    if (this.allColumns) return data

    return data.map((object) => {
      return pick(object, this.columns)
    })
  }
}

module.exports = SelectCommand
