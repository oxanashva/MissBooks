import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

const { useState, useEffect } = React

export function BookList({ books, onSelect, onRemove }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onSelect(book)}><Link to={`/books/${book.id}`}>Select</Link></button>
                        <button onClick={() => onRemove(book.id)}>Remove</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}

