const parseWhereCommand = require("./where")

describe("With normal command", () => {
  const command = 'SELECT * FROM table WHERE { "a": 1, "b": 2 }'

  test("It returns the correct WhereCommand", () => {
    expect(parseWhereCommand(command).conditions).toEqual({ a: 1, b: 2 })
  })
})
