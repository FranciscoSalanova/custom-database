const parseSelectCommand = require("./select")

describe("With all columns", () => {
  const command = "SELECT * FROM table"

  test("It returns correct SelectCommand", () => {
    const selectCommand = parseSelectCommand(command)

    expect(selectCommand.allColumns).toBeTruthy()
    expect(selectCommand.table.tableName).toBe("table")
  })
})

// Correct formatting cases:
// SELECT * FROM table
// SELECT a FROM table
// SELECT a, b FROM table

// Incorrect formatting cases:
// SELECT FROM table
// SELECT , FROM table
// SELECT a FROM
// SELECT FROM
// * FROM table
// SELECT * table
