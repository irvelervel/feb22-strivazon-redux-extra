import { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { addToCartAction, addToCartActionWithThunk } from '../redux/actions'

// BookDetail really does not need to ready *anything* from the redux store!
// it's job is just to append a new book at the end of the current cart.content

// in any case, for accessing mapDispatchToProps we STILL need to write a mapStateToProps
// because mapDispatchToProps is the second argument of the connect function!

// the state your mapStateToProps is receiving as the argument
// is STILL THE BIG PIE! everything should work as before :)
const mapStateToProps = (state) => ({
  username: state.user.name,
})

const mapDispatchToProps = (dispatch) => ({
  // here we're going to write some props capable of interacting with the redux store
  // that means, some props capable of DISPATCHING ACTIONS!
  // let's create a prop that will dispatch an action when invoked!
  addToCart: (bookToAdd) => {
    dispatch(addToCartActionWithThunk(bookToAdd))
  },
})

class BookDetail extends Component {
  state = {
    book: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookSelected !== this.props.bookSelected) {
      this.setState({
        book: this.props.bookSelected,
      })
    }
  }

  render() {
    return (
      <div className="mt-3">
        {this.state.book ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{this.state.book.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img
                    className="book-cover"
                    src={this.state.book.imageUrl}
                    alt="book selected"
                  />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>
                  {this.state.book.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>
                  {this.state.book.price}
                </p>
                {this.props.username ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      // Let's do something in here!
                      this.props.addToCart(this.state.book)
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <div>Log in to add book to the cart!</div>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Please select a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
