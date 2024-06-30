const parseInsertCommand = require('./parsers/insert')

console.log(parseInsertCommand('INSERT { "a": 1 } INTO tableName'))
