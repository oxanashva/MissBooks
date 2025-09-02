import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"
import { BookEdit } from "../cmps/BookEdit.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        console.log(filterBy);

        bookService.query(filterBy)
            .then(setBooks)
            .catch(error => console.log(error))
    }, [filterBy])

    function onClearFilter() {
        setFilterBy(bookService.getDefaultFilter())
    }

    function onOpenModal() {
        setIsEditOpen(true)
    }

    function onCloseModal() {
        setIsEditOpen(false)
    }

    function onAddBook(savedBook) {
        setBooks([...books, savedBook])
    }

    function onUpdateBook(savedBook) {
        setBooks(books.map(book => book.id === savedBook.id ? savedBook : book))
    }

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
            <button onClick={onOpenModal}>Add Book</button>

            {isEditOpen &&
                <BookEdit
                    isEditOpen={isEditOpen}
                    onCloseModal={onCloseModal}
                    onAddBook={onAddBook}
                    onUpdateBook={onUpdateBook}
                />
            }

            <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} onClearFilter={onClearFilter} />

            <BookList books={books} onSelect={setSelectedBook} onRemove={onRemove} />
        </section>
    )
}