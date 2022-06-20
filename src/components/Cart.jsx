import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
// import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCartAction } from '../redux/actions'

// const mapStateToProps = (state) => ({
//   cart: state.cart.content,
//   // cart is the array of books in the cart (state.cart.content)
// })

// const mapDispatchToProps = (dispatch) => ({
//   removeFromCart: (indexToRemove) => {
//     dispatch(removeFromCartAction(indexToRemove))
//   },
// })

const Cart = () => {
  // const params = useParams()
  // console.log(params)

  const cart = useSelector((state) => state.cart.content)
  const dispatch = useDispatch()

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: 'none' }}>
          {cart.map((book, i) => (
            <li key={i} className="my-4">
              <Button
                variant="danger"
                onClick={() => {
                  dispatch(removeFromCartAction(i))
                }}
              >
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="font-weight-bold">
          TOTAL:{' '}
          {cart.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Cart
