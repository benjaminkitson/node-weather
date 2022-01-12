function doMath(number, callback) {
  callback(number)
}

function doMoreMath(number2, callback) {
  callback(number2)
}

doMath(1, (x) => {
  const result = x * 2
  doMoreMath((result), (y) => {
    const result = y * 3
    console.log(result)
  })
})
