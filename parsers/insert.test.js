const parseInsertCommand = require("./insert")

describe("With a valid command", () => {
  const command = 'INSERT { "a": 1 } INTO table'

  test("It returns correct insert command", () => {
    const insertCommand = parseInsertCommand(command)

    expect(insertCommand.record).toEqual({ a: 1 })
    expect(insertCommand.table.tableName).toBe("table")
  })
})

describe("With an invalid record", () => {
  const command = "INSERT { : 1 } INTO table"

  test("It returns undefined", () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})

describe("With no table name", () => {
  const command = 'INSERT { "a" : 1 } INTO'

  test("It returns undefined", () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})

describe("With no INSERT clause", () => {
  const command = '{ "a": 1 } INTO table'

  test("It returns undefined", () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})

describe("With no INTO clause", () => {
  const command = 'INSERT { "a": 1 } table'

  test("It returns undefined", () => {
    expect(parseInsertCommand(command)).toBeUndefined()
  })
})
