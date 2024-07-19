const Table = require("../Table")

class DeleteCommand {
  constructor({ tableName }) {
    this.table = new Table(tableName)
  }

  async perform(whereCommand) {
    const originalData = await this.table.readData()

    let dataToDelete = originalData
    if (whereCommand) {
      dataToDelete = whereCommand.perform(dataToDelete)
    }

    const dataToKeep = originalData.filter((record) => {
      return !dataToDelete.includes(record) // return the record that IS NOT included in the data to delete
    })

    await this.table.overwriteTable(dataToKeep)
    return dataToDelete.map((record) => record._id) // only returs the id of the records deleted
  }
}

module.exports = DeleteCommand
