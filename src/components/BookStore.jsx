import { useState, useEffect } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getBooksAction } from '../redux/actions'

// const mapStateToProps = (state) => ({
//   booksFromRedux: state.book.stock, // the array of books from the store
//   areBooksLoading: state.book.isLoading, // the boolean value holding the loading state
//   errorInFetching: state.book.isError, // the boolean value holding the error state
// })

// const mapDispatchToProps = (dispatch) => ({
//   getBooks: () => {
//     dispatch(getBooksAction())
//   },
// })

const BookStore = () => {
  // state = {
  //   // books: [],
  //   bookSelected: null,
  // }

  const [bookSelected, setBookSelected] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // getBooks()
    dispatch(getBooksAction())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const booksFromRedux = useSelector((state) => state.book.stock)
  const areBooksLoading = useSelector((state) => state.book.isLoading)
  const errorInFetching = useSelector((state) => state.book.isError)

  // componentDidMount = async () => {
  //   // in here now I'll not do the fetch inside this component
  //   // but instead I'll dispatch the getBooksAction action-creator!
  //   // which will fetch the books and then travel towards the reducer
  //   this.props.getBooks()
  // }

  // changeBook = (book) => this.setState({ bookSelected: book })
  const changeBook = (book) => setBookSelected(book)

  return (
    <Row>
      <Col md={4}>
        {areBooksLoading ? (
          <div className="text-center">
            <Spinner variant="success" animation="border" />
          </div>
        ) : errorInFetching ? (
          <Alert variant="danger">Error! :(</Alert>
        ) : (
          <BookList
            bookSelected={bookSelected}
            changeBook={changeBook}
            books={booksFromRedux} // empty array to start
          />
        )}
      </Col>
      <Col md={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookStore
// mapStateToProps in here is needed to retrieve state.book.stock, the array
// that now holds the available books
// mapDispatchToProps in here is needed to dispatch getBooksAction in the mounting phase,
// in order to fill up state.book.stock
