import React from "react"
import { Redirect } from "react-router-dom"

class CreateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      price: 0,
      image: "",
      toProductList: false
    }
  }

  handleChange = (e) => {
    console.log(`changing ${e.target.id}`)
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Create Button Clicked`)

    // this.props.addNewProductFunc(this.state) // test

    console.log(`resetting`)
    this.setState({
      title: "",
      price: 0,
      image: "",
      toProductList: true
    })
    // this.props.history.push("/products") // test
    this.props.addNewProductFunc(this.state) // test
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
                  <input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.title} />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input type="number" name="price" id="price" onChange={this.handleChange} value={this.state.price} />
                </td>
              </tr>
              <tr>
                <td>Image Url</td>
                <td>
                  <input type="text" name="image" id="image" onChange={this.handleChange} value={this.state.image} />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default CreateProduct
