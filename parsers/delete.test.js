const parseDeleteCommand = require("./delete")

describe("With a valid command", () => {
  const command = "DELETE FROM table"

  test("It returns correct delete command", () => {
    const deleteCommand = parseDeleteCommand(command)

    expect(deleteCommand.table.tableName).toBe("table")
  })
})

describe("With no table name", () => {
  const command = "DELETE FROM "

  test("It returns undefined", () => {
    const deleteCommand = parseDeleteCommand(command)

    expect(deleteCommand).toBeUndefined()
  })
})

describe("With no DELETE clause", () => {
  const command = " FROM table"

  test("It returns undefined", () => {
    const deleteCommand = parseDeleteCommand(command)

    expect(deleteCommand).toBeUndefined()
  })
})

describe("With no FROM clause", () => {
  const command = "DELETE table "

  test("It returns undefined", () => {
    const deleteCommand = parseDeleteCommand(command)

    expect(deleteCommand).toBeUndefined()
  })
})
