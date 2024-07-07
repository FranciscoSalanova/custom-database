const Table = require("../Table")

class InsertCommand {
  constructor({ record, tableName }) {
    this.table = new Table(tableName)
    this.record = record
  }

  async perform() {
    return await this.table.insertRecord(this.record)
  }
}

module.exports = InsertCommand
