import React from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      price: "",
      image: "",
      toProductList: false,
      titleValid: false,
      priceValid: false
    }
  }

  componentDidMount = () => {
    axios.get(`http://localhost:4000/api/products/${this.props.match.params.id}`).then((response) => {
      this.setState({ title: response.data.title, price: response.data.price, image: response.data.image })
    })
  }

  onSubmit(e) {
    e.preventDefault()
  }

  deleteProduct = () => {
    axios
      .delete(`http://localhost:4000/api/products/${this.props.match.params.id}`)
      .then((response) => {
        if (response.data.status === true) {
          this.setState({ toProductList: true })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  updateProduct = () => {
    console.log("update triggered")
    axios
      .put(`http://localhost:4000/api/products/${this.props.match.params.id}`, {
        title: this.state.title,
        price: this.state.price,
        image: this.state.url
      })
      .then((response) => {
        if (response.data.status === true) {
          this.setState({ toProductList: true })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleChange = (e) => {
    console.log(`changing ${e.target.id}`)

    this.setState({ [e.target.id]: e.target.value }, () => {
      if (this.state.title === "" && this.state.title.length < 4) {
        this.setState({ titleValid: false })
      } else {
        this.setState({ titleValid: true })
      }
      if (this.state.price === "") {
        this.setState({ priceValid: false })
      } else {
        this.setState({ priceValid: true })
      }
    })
  }

  render() {
    if (this.state.toProductList) {
      return <Redirect to="/products" />
    }
    console.log("Edit Product Props:", this.props)
    console.log("Edit Product State:", this.state)
    return (
      <div>
        <h1>Edit Product</h1>
        <form onSubmit={this.onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input type="number" id="price" min="0" onChange={this.handleChange} value={this.state.price} />
                </td>
              </tr>
              <tr>
                <td>Image Url</td>
                <td>
                  <input type="text" id="image" onChange={this.handleChange} value={this.state.image} />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Delete" onClick={this.deleteProduct} />
          <input
            type="submit"
            value="Update"
            disabled={!this.state.titleValid || !this.state.priceValid}
            onClick={this.updateProduct}
          />
        </form>
      </div>
    )
  }
}

export default EditProduct
