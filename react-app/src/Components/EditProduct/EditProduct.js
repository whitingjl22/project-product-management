import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      price: "",
      image: "",
      // toProductList: false,
      titleValid: false,
      priceValid: false
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/products/edit/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          price: response.data.price,
          image: response.data.image
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  onSubmit(e) {
    e.preventDefault()
    const obj = {
      title: this.state.title,
      price: this.state.price,
      image: this.state.image
    }
    axios.post("http://localhost:3000/products/update/" + this.props.match.params.id, obj).then((res) => console.log(res.data))

    this.props.history.push("/index")
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Create Button Clicked`)

    console.log(`resetting`)
    this.setState({
      title: "",
      price: "",
      image: "",
      toProductList: true
    })
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

  render() {
    console.log("Edit Product Props:", this.props)
    console.log("Edit Product State:", this.state)
    return (
      <div>
        <h1>Edit Product</h1>
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
                  <input type="number" id="price" onChange={this.handleChange} value={this.state.price} />
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
          <Link to={"/products/"}>
            <input type="submit" value="Delete" />
          </Link>
          <Link to={"/products/"}>
            <input type="submit" value="Update" disabled={!this.state.titleValid || !this.state.priceValid} />
          </Link>
        </form>
      </div>
    )
  }
}

export default EditProduct
