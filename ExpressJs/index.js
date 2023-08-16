const path = require("path")
const express = require("express")
const app = express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
console.log(path.join(__dirname, "./public"))
const cors = require('cors');
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json());


const staticPath = path.join(path.join(__dirname, "./public"))

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }))

app.set('view engine', "hbs")

let dummyData = [
    {
        "id": 1,
        "title": "Microsoft Surface Laptop 4  1",
        "description": "Style and speed. Stand out on ...1",
        "price": 1499,
        "discountPercentage": 10.23,
        "rating": 4.43,
        "stock": 68,
        "brand": "Microsoft Surface",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/8/1.jpg",
            "https://i.dummyjson.com/data/products/8/2.jpg",
            "https://i.dummyjson.com/data/products/8/3.jpg",
            "https://i.dummyjson.com/data/products/8/4.jpg",
            "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
        ]
    },
    {
        "id": 2,
        "title": "Microsoft Surface Laptop 4  2",
        "description": "Style and speed. Stand out on ...2",
        "price": 1499,
        "discountPercentage": 10.23,
        "rating": 4.43,
        "stock": 68,
        "brand": "Microsoft Surface",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/8/1.jpg",
            "https://i.dummyjson.com/data/products/8/2.jpg",
            "https://i.dummyjson.com/data/products/8/3.jpg",
            "https://i.dummyjson.com/data/products/8/4.jpg",
            "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
        ]
    },
    {
        "id": 3,
        "title": "Microsoft Surface Laptop 4  3",
        "description": "Style and speed. Stand out on ...3",
        "price": 1499,
        "discountPercentage": 10.23,
        "rating": 4.43,
        "stock": 68,
        "brand": "Microsoft Surface",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/8/1.jpg",
            "https://i.dummyjson.com/data/products/8/2.jpg",
            "https://i.dummyjson.com/data/products/8/3.jpg",
            "https://i.dummyjson.com/data/products/8/4.jpg",
            "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
        ]
    },
    {
        "id": 4,
        "title": "Microsoft Surface Laptop 4  4",
        "description": "Style and speed. Stand out on ...4",
        "price": 1499,
        "discountPercentage": 10.23,
        "rating": 4.43,
        "stock": 68,
        "brand": "Microsoft Surface",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/8/1.jpg",
            "https://i.dummyjson.com/data/products/8/2.jpg",
            "https://i.dummyjson.com/data/products/8/3.jpg",
            "https://i.dummyjson.com/data/products/8/4.jpg",
            "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
        ]
    }
]

let books = [{
    "BookID": "1",
    "Title": "Book 1",
    "Author": "Author 1"
},
{
    "BookID": "2",
    "Title": "Book 2",
    "Author": "Author 2"
},
{
    "BookID": "3",
    "Title": "Book 3",
    "Author": "Author 3"
}
]


// app.use(express.static(staticPath))

// app.get('/',function(req,res){
//     res.render("index")
// })



app.get('/', function (req, res) {
    res.status(200).send("<h1>hello world</h1>")
})

app.get('/new', function (req, res) {
    res.sendFile(__dirname)
})
app.get('/about', function (req, res) {
    res.send("hello delete page")
})

app.get('/duummyData', function (req, res) {
    res.json(JSON.stringify(dummyData))
})

app.get('/create', function (req, res) {
    res.json(JSON.stringify(books))
})

app.post('/create', function (req, res) {
    var newBook = {
        "BookID": req.body.BookID,
        "Title": req.body.Title,
        "Author": req.body.Author
    }
    books.push(newBook)
    console.log(books);
})
app.get('/calc', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post('/calc', function (req, res) {
    let n1 = Number(req.body.v1)
    let n2 = Number(req.body.v2)
    let sum = n1 + n2
    res.send(`${sum}`)
    console.log(sum)
})

app.post('/api/data', (req, res) => {
    const receivedData = req.body.data;
    
    // Process the received data as needed
    
    res.send('Data received');
  });

app.listen(8000, "127.0.0.1")