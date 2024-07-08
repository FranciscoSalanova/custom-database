const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function start() {
  while (true) {
    try {
      const commandString = await waitForCommand()
      console.log(commandString)
    } catch (e) {
      console.error(`${e.name}: ${e.message}`)
    }
  }
}

start()

function waitForCommand() {
  return new Promise((resolve) => {
    rl.question(">  ", resolve)
  })
}
