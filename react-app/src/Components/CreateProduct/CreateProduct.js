import React from "react"

class CreateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      price: 0,
      image: ""
    }
  }

  handleChange = (e) => {
    console.log(`changing ${e.target.id}`)
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Create Button Clicked`)

    console.log(`resetting`)
    this.setState({
      title: "",
      price: 0,
      image: ""
    })
  }

  render() {
    console.log("Create Product State:", this.state)
    console.log("Create Product Props:", this.props)
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
