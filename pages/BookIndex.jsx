import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        console.log({ filterBy });

        bookService.query(filterBy).then(setBooks)
    }, [filterBy])

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <h2>Book Index</h2>
            <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <BookList books={books} />
        </section>
    )
}