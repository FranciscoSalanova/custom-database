function safeParseJSON(string) {
  try {
    return JSON.parse(string)
  } catch {
    return
  }
}

module.exports = safeParseJSON
