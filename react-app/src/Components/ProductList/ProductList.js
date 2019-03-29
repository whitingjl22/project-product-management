import React from "react"
import "./ProductList.css"

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
                  <button>Edit</button>
                  <br />
                  <button>Delete</button>
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
