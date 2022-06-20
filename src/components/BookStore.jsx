import { Component } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row, Spinner, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBooksAction } from '../redux/actions'

const mapStateToProps = (state) => ({
  booksFromRedux: state.book.stock, // the array of books from the store
  areBooksLoading: state.book.isLoading, // the boolean value holding the loading state
  errorInFetching: state.book.isError, // the boolean value holding the error state
})

const mapDispatchToProps = (dispatch) => ({
  getBooks: () => {
    dispatch(getBooksAction())
  },
})

class BookStore extends Component {
  state = {
    // books: [],
    bookSelected: null,
  }

  componentDidMount = async () => {
    // in here now I'll not do the fetch inside this component
    // but instead I'll dispatch the getBooksAction action-creator!
    // which will fetch the books and then travel towards the reducer
    this.props.getBooks()
  }

  changeBook = (book) => this.setState({ bookSelected: book })

  render() {
    return (
      <Row>
        <Col md={4}>
          {this.props.areBooksLoading ? (
            <div className="text-center">
              <Spinner variant="success" animation="border" />
            </div>
          ) : this.props.errorInFetching ? (
            <Alert variant="danger">Error! :(</Alert>
          ) : (
            <BookList
              bookSelected={this.state.bookSelected}
              changeBook={this.changeBook}
              // books={this.state.books}
              books={this.props.booksFromRedux} // empty array to start
            />
          )}
        </Col>
        <Col md={8}>
          <BookDetail bookSelected={this.state.bookSelected} />
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore)
// mapStateToProps in here is needed to retrieve state.book.stock, the array
// that now holds the available books
// mapDispatchToProps in here is needed to dispatch getBooksAction in the mounting phase,
// in order to fill up state.book.stock
