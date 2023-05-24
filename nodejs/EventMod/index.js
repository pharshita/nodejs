const EventEmitter = require("events") 

const event = new EventEmitter()

event.on('myname',(ss , done)=>{
console.log("harshita" , `${ss} , ${done}`)
})
event.on('myname',()=>{
console.log("patidar")
})
event.on('myname',()=>{
console.log("pathrad")
})

event.emit("myname",200,"ok")