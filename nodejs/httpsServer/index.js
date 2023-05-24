const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("hello from the home page")
    } else if (req.url == "/about") {
        res.end("hello from the about page")
    } else if (req.url == "/data") {
        fs.readFile(`${__dirname}/createAPI/api.json`, 'utf-8', (err, data) => {
            const obj = JSON.parse(data)[0].title
            console.log(obj)
            res.end(data)
        })
    } else {
        res.writeHead(404)
        res.end("404")
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("done")
})