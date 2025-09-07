import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useLocation } = ReactRouterDOM

export function BookAdd() {
    const location = useLocation()
    const books = location.state || []

    const googleBooks = [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
        { id: 3, title: 'Book 3' },
    ]

    function onAddBook(bookToAdd) {
        const isBookExists = books.some(book => book.title === bookToAdd.title)
        if (!isBookExists) {
            bookService.addGoogleBook(bookToAdd)
                .then(savedBook => {
                    showSuccessMsg('Book added, book id:' + savedBook.id)
                })
                .catch(error => {
                    console.error('Error:', error)
                    showErrorMsg('Cannot add book')
                })
        }
    }

    return (
        <section className="book-add">
            <h2>Book Add</h2>
            <ul>
                {googleBooks.map(book => <li key={book.id}>
                    <span>{book.title}</span>
                    <button onClick={() => onAddBook(book)}>+</button>
                </li>)}
            </ul>
        </section>
    )
}