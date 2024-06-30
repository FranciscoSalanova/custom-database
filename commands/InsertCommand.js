class InsertCommand {
  constructor({ record, tableName }) {
    this.tableName = tableName
    this.record = record
  }
}

module.exports = InsertCommand
