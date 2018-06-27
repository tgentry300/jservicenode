const axios = require('axios')
const http = require('http')
const fs = require('fs')

const hostname = null
const port = 3000
const baseURI = "http://jservice.io/api/categories?count=100&offset="

let randomNumberBottom = 1
let randomNumberTop = 18000

function getRandomNumber() {
    return (Math.floor(Math.random() * randomNumberTop) + randomNumberBottom)
}

const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        response.statusCode = 200;
        response.end("new category, file overwritten")
        axios.get(baseURI + getRandomNumber())
            .then(response => {
                console.log("Status code:", response.status);
                const hydratedBody = response.data
                fs.writeFileSync("file.txt", JSON.stringify(hydratedBody))
            });
    }
})



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});