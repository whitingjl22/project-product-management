import React from "react"
import NavBar from "../NavBar/NavBar"
import "react-router"
import "./Container.css"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import axios from "axios"

import Home from "./../Home/Home"
import ProductList from "./../ProductList/ProductList"
import EditProduct from "./../EditProduct/EditProduct"
import CreateProduct from "./../CreateProduct/CreateProduct"

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = () => {
    let products = []

    axios
      .get("http://localhost:4000/api/products")
      .then((response) => {
        products = [...response.data]
        this.setState({
          products
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  addNewProduct = (product) => {
    var tempProduct = {
      title: product.title,
      price: product.price,
      image: product.image
    }
    axios.post("http://localhost:4000/api/products/add", tempProduct).then((response) => {
      tempProduct = {
        id: response.data.id,
        title: product.title,
        price: product.price,
        image: product.image
      }
      this.setState({
        products: [...this.state.products, tempProduct]
      })
    })
  }

  deleteProduct = (product) => {
    axios
      .delete(`http://localhost:4000/api/products/delete/${product.id}`)
      .then((response) => {
        console.log(response)
        this.getProducts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    console.log("Container Page State:", this.state)
    console.log("Products", this.state.products)
    return (
      <div className="containerPage">
        <h1>PPM - Project Product Management</h1>
        <BrowserRouter>
          <NavBar />
          <div className="contentContainer">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/home" component={Home} />
              <Route path="/products/edit/:id" render={(props) => <EditProduct {...props} />} />

              <Route path="/products/new" render={() => <CreateProduct addNewProductFunc={this.addNewProduct} />} />

              <Route
                path="/products"
                render={() => (
                  <ProductList
                    products={this.state.products}
                    deleteProductFunc={this.deleteProduct}
                    getProductsFunc={this.getProducts}
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default Container
