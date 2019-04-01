import React from "react"
import "./ProductList.css"
import { Link } from "react-router-dom"

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getProductsFunc()
  }

  render() {
    console.log("Product List Props:", this.props)
    return (
      <div className="productList">
        <h1>Product List</h1>
        <div>
          <ul>
            {this.props.products.map((product) => {
              return (
                <li key={product.id}>
                  <img src={product.image} alt="" />
                  <br />
                  {product.title}
                  <br />${product.price}
                  <br />
                  <br />
                  <Link to={"/products/edit/" + product.id}>
                    <button>Edit</button>
                  </Link>
                  <br />
                  <button onClick={() => this.props.deleteProductFunc(product)}>Delete</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProductList
