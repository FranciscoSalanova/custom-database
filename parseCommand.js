const InvalidCommandError = require("./Errors/InvalidCommandError")
const parseInsertCommand = require("./parsers/insert")
const parseSelectCommand = require("./parsers/select")
const parseWhereCommand = require("./parsers/where")

const parsers = [parseInsertCommand, parseSelectCommand]

async function parseCommand(commandString) {
  const command = parsers
    .map((parser) => parser(commandString))
    .find((command) => command != null)

  if (command == null) throw new InvalidCommandError(command)

  const whereCommand = parseWhereCommand(commandString)

  return await command.perform(whereCommand)
}

module.exports = parseCommand
