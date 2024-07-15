const parseSelectCommand = require("./select")

describe("With all columns", () => {
  const command = "SELECT * FROM table"

  test("It returns correct SelectCommand", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand.allColumns).toBeTruthy()
    expect(selectCommand.table.tableName).toBe("table")
  })
})

describe("With specific columns", () => {
  const command = "SELECT a, b FROM table"

  test("It returns correct SelectCommand", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand.columns).toIncludeSameMembers(["a", "b"])
    expect(selectCommand.allColumns).toBeFalsy()
    expect(selectCommand.table.tableName).toBe("table")
  })
})

describe("With no columns", () => {
  const command = "SELECT FROM table"

  test("It returns undefined", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand).toBeUndefined()
  })
})

describe("With no columns, only a coma", () => {
  const command = "SELECT , FROM table"

  test("It returns undefined", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand).toBeUndefined()
  })
})

describe("With no select clause", () => {
  const command = "a FROM table"

  test("It returns undefined", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand).toBeUndefined()
  })
})

describe("With no select clause", () => {
  const command = "a FROM table"

  test("It returns undefined", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand).toBeUndefined()
  })
})

describe("With no from clause", () => {
  const command = "SELECT a table"

  test("It returns undefined", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand).toBeUndefined()
  })
})

describe("With no from clause", () => {
  const command = "SELECT a table"

  test("It returns undefined", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand).toBeUndefined()
  })
})

describe("With no table name", () => {
  const command = "SELECT a FROM"

  test("It returns undefined", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand).toBeUndefined()
  })
})
