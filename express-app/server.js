const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 4000
const cors = require("cors")
const axios = require("axios")
const path = require("path")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "./../react-app/build/"))

// GET Products
app.get("/api/products", (request, response) => {
  axios
    .get("http://5c992ab94236560014393239.mockapi.io/products")
    .then((productsGetResponse) => {
      return response.json(productsGetResponse.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

// POST Product
app.post("/api/products/add", (request, response) => {
  axios
    .post("http://5c992ab94236560014393239.mockapi.io/products", request.body)
    .then((mockApiResponse) => {
      console.log(mockApiResponse)
      return response.json(mockApiResponse.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

// DELETE Product
app.delete("/api/products/delete/:id", (request, response) => {
  axios
    .delete(`http://5c992ab94236560014393239.mockapi.io/products/${request.params.id}`)
    .then((mockApiResponse) => {
      console.log(`Delete Product ${request.params.id}`)
      return response.json({ status: true })
    })
    .catch((error) => {
      console.log(error)
    })
})

// PUT Product
app.put("/api/products/update/:id", (request, response) => {
  axios
    .put(`http://5c992ab94236560014393239.mockapi.io/products/${request.params.id}`, request.body)
    .then((mockApiResponse) => {
      console.log(`PUT Product ${request.params.id}`)
      return response.json({ status: true })
    })
    .catch((error) => {
      console.log(error)
    })
})

// GET Individual Product Data
app.get("/api/products/:id", (request, response) => {
  axios
    .get(`http://5c992ab94236560014393239.mockapi.io/products/${request.params.id}`)
    .then((mockApiResponse) => {
      return response.json(mockApiResponse.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname + "./../react-app/build/index.html"))
})

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT)
})
