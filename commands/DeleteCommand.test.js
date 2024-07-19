const DeleteCommand = require("./DeleteCommand")

describe("With a valid command", () => {
  const deleteCommand = new DeleteCommand({})
  const data = [
    { _id: 1, a: 2 },
    { _id: 2, a: 4 },
  ]

  test("It deletes all records", async () => {
    const readSpy = jest
      .spyOn(deleteCommand.table, "readData")
      .mockResolvedValue(data)
    const deleteSpy = jest
      .spyOn(deleteCommand.table, "overwriteTable")
      .mockResolvedValue()

    expect(await deleteCommand.perform()).toEqual([1, 2])
    expect(deleteSpy).toHaveBeenCalledWith([])
    expect(readSpy).toHaveBeenCalled()
  })
})

describe("With a WHERE clause", () => {
  const deleteCommand = new DeleteCommand({})
  const whereCommand = { perform: (data) => [data[0]] }
  const data = [
    { _id: 1, a: 2 },
    { _id: 2, a: 4 },
  ]

  test("It deletes all matching records", async () => {
    const readSpy = jest
      .spyOn(deleteCommand.table, "readData")
      .mockResolvedValue(data)
    const deleteSpy = jest
      .spyOn(deleteCommand.table, "overwriteTable")
      .mockResolvedValue()
    const dataToKeep = [{ _id: 2, a: 4 }]

    expect(await deleteCommand.perform(whereCommand)).toEqual([1])
    expect(deleteSpy).toHaveBeenCalledWith(dataToKeep)
    expect(readSpy).toHaveBeenCalled()
  })
})
