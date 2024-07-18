const SelectCommand = require("./SelectCommand")

describe("With all columns selected", () => {
  const selectCommand = new SelectCommand({ allColumns: true })
  const data = [
    { a: 1, b: 2 },
    { a: 3, b: 4 },
  ]

  test("It returns the data as is", async () => {
    const spy = jest
      .spyOn(selectCommand.table, "readData")
      .mockResolvedValue(data)

    expect(await selectCommand.perform()).toIncludeSameMembers(data)
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })
})

describe("With individual columns selected", () => {
  const selectCommand = new SelectCommand({ columns: ["a", "c"] })
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 },
  ]

  test("It returns only the selected columns", async () => {
    const spy = jest
      .spyOn(selectCommand.table, "readData")
      .mockResolvedValue(data)

    expect(await selectCommand.perform()).toIncludeSameMembers([
      { a: 1, c: 3 },
      { a: 4, c: 6 },
    ])
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })
})

describe("With a WHERE command", () => {
  const selectCommand = new SelectCommand({ allColumns: true })
  const whereCommand = { perform: (data) => [data[0]] }
  const data = [
    { a: 1, b: 2 },
    { a: 3, b: 4 },
  ]

  test("It returns only the values matched by the where command", async () => {
    const spy = jest
      .spyOn(selectCommand.table, "readData")
      .mockResolvedValue(data)

    expect(await selectCommand.perform(whereCommand)).toIncludeSameMembers([
      { a: 1, b: 2 },
    ])
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })
})
