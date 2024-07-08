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
    const recordWithId = { _id: uuidV4(), ...record }

    return new Promise((resolve, reject) => {
      this.readData()
        .catch((e) => {
          if (e instanceof TableDoesNotExistError) {
            return []
          } else {
            reject(e)
          }
        })
        .then((data) => {
          fs.writeFile(
            this.filePath,
            JSON.stringify([...data, recordWithId]),
            (error) => {
              if (error) {
                reject(error)
              }
              resolve(recordWithId)
            }
          )
        })
    })
  }

  readData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (error, data) => {
        if (error) return reject(new TableDoesNotExistError(this.tableName))

        resolve(JSON.parse(data))
      })
    })
  }
}

module.exports = Table