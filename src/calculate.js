// Worlds simplest stack-based calculator
// = No parentheses, order-of-operations or anything too fancy.

export default exp => {
  const symbols = /(?:\-?[\d\.]+)|[-\+\*\/]|\s+/g

  if (exp !== exp.match(symbols).join(''))
    throw SyntaxError(`unparsable expression: ${exp}`)

  const squish = str => str.trim()
  const tokens = exp.match(symbols).map(squish).filter(Boolean)
  const floats = tokens.map(parseFloat)
  const queued = []

  for (let i = 0; i < tokens.length; i++)
    floats[i] === floats[i] ? queued.push(floats[i]) : ({
      '+': () => 0,
      '-': () => queued.push(floats[++i] * -1),
      '*': () => queued.push(queued.pop() * floats[++i]),
      '/': () => queued.push(queued.pop() / floats[++i])
    })[tokens[i]]()
  
  return queued.reduce((sum, t) => sum + t)
}
