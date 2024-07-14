const InvalidCommandError = require("./Errors/InvalidCommandError")
const parseInsertCommand = require("./parsers/insert")

const parsers = [parseInsertCommand]

async function parseCommand(commandString) {
  const command = parsers
    .map((parser) => parser(commandString))
    .find((command) => command != null)

  if (command == null) throw new InvalidCommandError(command)

  return await command.perform()
}

module.exports = parseCommand
