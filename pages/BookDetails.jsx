import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { AddReview } from "../cmps/AddReview.jsx"

const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        bookService.get(params.id)
            .then(book => {
                setBook(book)
            })
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot load book')
            })
    }, [params.id])

    function onAddReview(bookId, review) {
        bookService.addReview(bookId, review)
            .then(updatedBook => {
                setBook(updatedBook)
                showSuccessMsg('Review added')
            })
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot add review')
            })
    }

    function onRemoveReview(bookId, reviewId) {
        bookService.removeReview(bookId, reviewId)
            .then(book => {
                setBook(book)
                showSuccessMsg('Review removed')
            })
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot remove review')
            })
    }

    function getReadingLevel(pageCount) {
        if (pageCount > 500) {
            return 'Serious Reading'
        } else if (pageCount > 200) {
            return "Descent Reading"
        } else if (pageCount < 100) {
            return 'Light Reading'
        } else {
            return 'Normal Reading';
        }
    }

    function getBookStatus(publishedDate) {
        const currentYear = new Date().getFullYear()
        return (currentYear - publishedDate) > 10 ? 'Vintage' : 'New'
    }

    function getPriceStyle(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        else return ''
    }

    if (!book) return <div>Loading...</div>

    const { id, title, thumbnail, authors, categories, description, pageCount, publishedDate, prevBookId, nextBookId, listPrice: { amount, currencyCode, isOnSale }, reviews } = book

    return (
        <section className="book-details">
            <div className="header">
                {title && <h2 className="title">{title}</h2>}

                {thumbnail && <div className="img-container">
                    <img src={thumbnail} alt={title} />
                    {isOnSale && <span className="sale">Sale</span>}
                </div>}
            </div>

            <div className="meta">
                {authors && <p className="text-bold"><span className="text-gray">Authors:</span> {authors.join(', ')}</p>}

                {categories && <p className="categories">
                    {categories.map(category => <span key={utilService.makeId()}>{category}</span>)}
                </p>}

                {description && <LongTxt txt={description} />}

                {pageCount && <p className="level">{getReadingLevel(pageCount)}</p>}

                {publishedDate && <p className="status">{getBookStatus(publishedDate)}</p>}

                <p className="text-bold">
                    <span className="text-gray">Price: </span>
                    <span className={`text-colored ${getPriceStyle(amount)}`}>
                        {amount} {currencyCode}
                    </span>
                </p>

                <div className="btns-container">
                    <Link className="link-btn" to={`/books/${prevBookId}`}>Prev</Link>
                    <Link className="link-btn" to={`/books/${nextBookId}`}>Next</Link>
                    <Link className="link-btn" to={'/books'}>Back to books</Link>
                </div>
            </div>

            <div className="reviews">
                <p className="text-bold text-gray">Reviews:</p>
                <ul>
                    {reviews && reviews.map(review =>
                        <li key={review.id}>
                            <span className="stars">{"⭐".repeat(review.rating)}</span>
                            <span className="text-bold">{review.fullname} </span>
                            <span>read it on {new Date(review.readAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                            <button onClick={() => onRemoveReview(id, review.id)}>X</button>
                        </li>)
                    }
                </ul>
                <AddReview bookId={id} onAddReview={onAddReview} />
            </div>
        </section>
    )
}