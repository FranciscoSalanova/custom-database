const mock = require("mock-fs")
const fs = require("fs")
const Table = require("./Table")
const TableDoesNotExistError = require("./Errors/TableDoesNotExistError")

describe("#readData", () => {
  describe("With nonexisting table name", () => {
    beforeEach(() => mock({ data: {} }))
    afterEach(mock.restore)

    test("It throws TableDoesNonExistError", async () => {
      const table = new Table("table")
      await expect(table.readData()).rejects.toThrow(TableDoesNotExistError)
    })
  })

  describe("With existing table name", () => {
    const data = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ]
    beforeEach(() => mock({ data: { "table.json": JSON.stringify(data) } }))
    afterEach(mock.restore)

    test("It get all the data in the table", async () => {
      const table = new Table("table")
      expect(await table.readData()).toIncludeSameMembers(data)
    })
  })
})

describe("#insertRecord", () => {
  describe("With nonexisting table name", () => {
    beforeEach(() => mock({ data: {} }))
    afterEach(mock.restore)

    test("It creates the table and adds the record", async () => {
      const table = new Table("table")
      const recordToInsert = { a: 1, b: 2 }
      const { _id, ...newRecordAttributes } = await table.insertRecord(
        recordToInsert
      )

      expect(
        JSON.parse(fs.readFileSync("data/table.json"))
      ).toIncludeSameMembers([
        {
          _id,
          ...newRecordAttributes,
        },
      ])
      expect(_id).toBeDefined()
      expect(newRecordAttributes).toEqual(recordToInsert)
    })
  })

  describe("With existing table name", () => {
    const data = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ]
    beforeEach(() => mock({ data: { "table.json": JSON.stringify(data) } }))
    afterEach(mock.restore)

    test("It adds the record", async () => {
      const table = new Table("table")
      const recordToInsert = { a: 1, b: 2 }
      const { _id, ...newRecordAttributes } = await table.insertRecord(
        recordToInsert
      )

      expect(
        JSON.parse(fs.readFileSync("data/table.json"))
      ).toIncludeSameMembers([
        ...data,
        {
          _id,
          ...newRecordAttributes,
        },
      ])
      expect(_id).toBeDefined()
      expect(newRecordAttributes).toEqual(recordToInsert)
    })
  })
})