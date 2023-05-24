const fs = require("fs")
const http = require("http")

const server = http.createServer()

server.on('request', (req, res) => {
    // fs.appendFile("input.txt", " from pathrad", (err) => {
    //     console.log(err)
    // })
    // fs.readFile("input.txt", (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         res.end(data.toString())
    //     }
    // })

    // const realStream = fs.createReadStream("input.txt")
    // realStream.on("data", (chunkdata) => {
    //     res.write(chunkdata)
    // });
    // realStream.on("end",()=>{
    //     res.end()
    // })

    const realStream = fs.createReadStream("input.txt")
    realStream.pipe(res)
})

server.listen(8000, "127.0.0.1")