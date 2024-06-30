const InsertCommand = require('../commands/InsertCommand')

const INSERT_COMMAND = 'INSERT'
const BEFORE_TABLE_COMMAND = 'INTO'

const REGEX = new RegExp(
  `${INSERT_COMMAND}\\s+(?<record>{.*})\\s+${BEFORE_TABLE_COMMAND}\\s+(?<tableName>\\S+)`
)

function parseInsertCommand(commandString) {
  const regexMatch = commandString.match(REGEX)
  if (regexMatch == null) return

  const record = JSON.parse(regexMatch.groups.record)
  const tableName = regexMatch.groups.tableName

  return new InsertCommand({ record, tableName })
}

module.exports = parseInsertCommand
