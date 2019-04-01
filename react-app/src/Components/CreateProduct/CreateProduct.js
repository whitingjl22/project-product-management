import React from "react"
import { Redirect } from "react-router-dom"

class CreateProduct extends React.Component {
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

  handleChange = (e) => {
    console.log(`changing ${e.target.id}`)
    this.setState({ [e.target.id]: e.target.value }, () => {
      if (this.state.title.length < 4) {
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

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.addNewProductFunc({
      title: this.state.title,
      price: this.state.price,
      image: this.state.image
    })

    console.log(`resetting`)
    this.setState({
      title: "",
      price: "",
      image: "",
      toProductList: true
    })
  }

  render() {
    console.log("Create Product State:", this.state)
    console.log("Create Product Props:", this.props)
    if (this.state.toProductList === true) {
      return <Redirect to="/products" />
    }
    return (
      <div>
        <h1>Create Product</h1>
        <form onSubmit={this.handleSubmit}>
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
                  <input type="number" id="price" onChange={this.handleChange} value={this.state.price} min="0" />
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
          <input type="submit" value="Create" disabled={!this.state.titleValid || !this.state.priceValid} />
        </form>
      </div>
    )
  }
}

export default CreateProduct
