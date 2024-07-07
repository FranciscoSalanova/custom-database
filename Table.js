const { v4: uuidV4 } = require("uuid")
const fs = require("fs")
const TableDoesNotExistError = require("./Errors/TableDoesNotExistError")

class Table {
  constructor(tableName) {
    this.tableName = tableName
  }

  get filePath() {
    return `data/${this.tableName}.json`
  }

  insertRecord(record) {
    const recordWithId = { id: uuidV4(), ...record }
  }

  readData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (error, data) => {
        if (error) return reject(new TableDoesNotExistError(this.tableName))
      })
    })
  }
}

module.exports = Table
