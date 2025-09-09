import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"
import { BookEdit } from "../cmps/BookEdit.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot load books')
            })
    }, [filterBy])

    function onClearFilter() {
        setFilterBy(bookService.getDefaultFilter())
    }

    function onSaveBook(savedBook) {
        setBooks(prevBooks => {
            if (savedBook.id) {
                return prevBooks.map(book => book.id === savedBook.id ? savedBook : book)
            } else {
                return [savedBook, ...prevBooks]
            }
        })
    }

    function onRemove(id) {
        bookService.remove(id)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== id))
                showSuccessMsg('Book removed')
            })
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot remove book ' + id)
            })
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <h2>Book Index</h2>

            <div className="btns">
                <Link to="add-book" className="link-btn">Add Book</Link>
                <Link to="add" className="link-btn">Add Book from the Google Books</Link>
            </div>

            <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} onClearFilter={onClearFilter} />

            <BookList books={books} onSelect={setSelectedBook} onRemove={onRemove} />
            <Outlet context={{ onSaveBook }} />
        </section>
    )
}