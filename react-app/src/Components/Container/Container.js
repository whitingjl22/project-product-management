import React from "react"
import NavBar from "../NavBar/NavBar"
import "react-router"
import "./Container.css"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
// import axios from "axios"

import Home from "./../Home/Home"
import ProductList from "./../ProductList/ProductList"
import EditProduct from "./../EditProduct/EditProduct"
import CreateProduct from "./../CreateProduct/CreateProduct"

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextid: 3,
      products: [
        {
          id: 1,
          title: "DSLR Camera",
          price: 1499.99,
          image: "https://i.ebayimg.com/00/s/ODcyWDEwMjA=/z/Y3AAAOSweW5VE9xh/$_32.JPG"
        },
        {
          id: 2,
          title: "iLaptop",
          price: 1299.99,
          image:
            "https://as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/select/macbook-select-space-gray-201706_GEO_US?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1539399807811"
        }
      ]
    }
  }

  addNewProduct = (product) => {
    console.log("addNewProduct passing:", product)

    this.setState(
      {
        products: [
          ...this.state.products,
          {
            id: this.state.nextid + 1,
            title: product.title,
            price: product.price,
            image: product.image
          }
        ]
      },
      () => {
        // this.props.history.push("/products") // test
        return <Redirect to="/products" />
      }
    )
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

              <Route path="/products" render={() => <ProductList products={this.state.products} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default Container
