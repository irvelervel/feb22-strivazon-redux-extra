import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUsernameAction } from '../redux/actions'

// RULES OF HOOKS
// 1) USE REACT HOOKS JUST IN FUNCTIONAL COMPONENTS
// 2) USE HOOKS AT THE TOP LEVEL OF YOUR COMPONENT, OUTSIDE LOOPS, FUNCTIONS,
// IF STATEMENTS (their calling order must be the same every time)

// connect gives the specified component awareness of the redux store!
// it can take up to 2 arguments!
// 1) "read-mode" (mapStateToProps)
// 2) """write-mode""" (mapDispatchToProps)

// const mapStateToProps = (state) => {
//   return {
//     // every key of this object will become a prop for CartIndicator
//     cartLength: state.cart.content.length,
//     // CartIndicator really just needs the length of the cart...!
//     username: state.user.name,
//   }
// }

// down below is a quick&dirty approach! doing this your component will end up
// having cart and user as props!
// const mapStateToProps = state => state

// const mapDispatchToProps = (dispatch) => ({
//   setUsername: (name) => {
//     dispatch(setUsernameAction(name))
//   },
// })

const CartIndicator = () => {
  const navigate = useNavigate()
  // very similar in functionality to Link
  const [inputValue, setInputValue] = useState('')

  // useSelector is used for READING VALUES from the redux store (like mapStateToProps)
  const cartLength = useSelector((state) => state.cart.content.length)
  const username = useSelector((state) => state.user.name)

  // useDispatch is used for DISPATCHING ACTIONS to the redux store (like mapDispatchToProps)
  const dispatch = useDispatch() // you probably have to call it just once!

  return (
    <div className="ml-auto mt-2">
      {username ? (
        <>
          <span className="mr-2">Hello {username}!</span>
          <Button color="primary" onClick={() => navigate('/cart')}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(inputValue)
            // now inputValue should reach the redux store!
            // setUsername(inputValue)
            dispatch(setUsernameAction(inputValue))
          }}
        >
          <Form.Control
            placeholder="Log in here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form>
      )}

      {/* Link provides navigation like useNavigate but just in JSX */}
      {/* creating a special anchor tag around the elements you want */}
      {/* <Link to="/cart">
        <h1>SARAH</h1>
      </Link> */}
    </div>
  )
}

export default CartIndicator
// without the connect, your component is not a HOC anymore!
// because this component will not receive extra props anymore!
