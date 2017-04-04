module.exports = toOutput

function toOutput(pieces, ... substitutions) {
  var result = pieces[0]
  var substitutions = [].slice.call(arguments, 1)
  for (var i = 0; i < substitutions.length; ++i) {
      result += substitutions[i] + pieces[i + 1]
  }

  // Remove any indents
  return result.trim().split('\n').map(function (line) {
    return line.trim()
  }).join('\n')
}
