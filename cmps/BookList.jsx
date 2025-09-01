import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onSelect, onRemove }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <Link className="link-btn" to={`/books/${book.id}`} onClick={() => onSelect(book)}>Select</Link>
                        <button onClick={() => onRemove(book.id)}>Remove</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}

