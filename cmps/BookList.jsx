import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <Link className="link-btn" to={`/book/${book.id}`} >Select</Link>
                        <Link className="link-btn" to={`edit/${book.id}`}>Edit</Link>
                        <button onClick={() => onRemove(book.id)}>Remove</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}

