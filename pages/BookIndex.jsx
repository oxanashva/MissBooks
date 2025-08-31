import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        bookService.query(filterBy).then(setBooks)
    }, [filterBy])

    function onRemove(id) {
        bookService.remove(id)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== id))
            })
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <h2>Book Index</h2>
            <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <BookList books={books} onSelect={setSelectedBook} onRemove={onRemove} />
        </section>
    )
}