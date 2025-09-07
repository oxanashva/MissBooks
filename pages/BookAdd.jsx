import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { googleBookService } from "../services/google-book.service.js"

const { useState } = React

export function BookAdd() {
    const [googleBooks, setGoogleBooks] = useState(null)

    function onAddBook(bookToAdd) {
        bookService.addGoogleBook(bookToAdd)
            .then(savedBook => {
                setGoogleBooks(prevGoogleBooks => prevGoogleBooks.filter(book => book.id !== bookToAdd.id))
                showSuccessMsg('Book added, book id:' + savedBook.id)
            })
            .catch(error => {
                if (error.message) {
                    showErrorMsg(error.message)
                } else {
                    showErrorMsg('Cannot add book')
                }
                console.error('Error:', error)
            })
    }

    function onSearchSubmit(event) {
        event.preventDefault()
        googleBookService.query(event.target.search.value)
            .then(setGoogleBooks)
    }

    return (
        <section className="book-add">
            <h2>Book Add</h2>
            <form onSubmit={onSearchSubmit}>
                <input type="search" name="search" id="search" placeholder="Search Google Books" />
            </form>
            <ul>
                {googleBooks && googleBooks.map(book => <li key={book.id}>
                    <span>{book.volumeInfo.title}</span>
                    <button onClick={() => onAddBook(book)}>+</button>
                </li>)}
            </ul>
        </section>
    )
}