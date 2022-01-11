function randoms(func) {
  setTimeout(function() {
    const random = Math.random();
    if (random > 0.5) {
      func(undefined, "It's bigger than 0.5!")
    } else {
      func("It's less than 0.5!", undefined)
    }
  }, 2000)
}

randoms((bigger, smaller) => {
  if (bigger) {
    console.log(bigger)
  } else {
    console.log(smaller)
  }
})
