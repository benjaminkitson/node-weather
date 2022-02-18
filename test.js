const me = {name : "Ben"}

me.age = 26

me.toJSON = function() {
  return "Herpy derp"
}

console.log(JSON.stringify(me))
