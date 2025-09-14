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
                    <Link className="link-btn" to={`/book/${prevBookId}`}>Prev</Link>
                    <Link className="link-btn" to={`/book/${nextBookId}`}>Next</Link>
                    <Link className="link-btn" to={'/book'}>Back to books</Link>
                </div>
            </div>

            <div className="reviews">
                <p className="text-bold text-gray">Reviews:</p>
                <ul>
                    {reviews && reviews.map(review =>
                        <li className="review" key={review.id}>
                            {review.ratingFormat === "select" &&
                                <p className="review-content">
                                    <span>Rating:</span>
                                    <span className="text-italic">{review.rating}/5 stars</span>
                                </p>
                            }

                            {review.ratingFormat === "textbox" &&
                                <p className="review-content">
                                    <span>Review:</span>
                                    <span className="text-italic">{review.rating}</span>
                                </p>
                            }

                            {review.ratingFormat === "stars" &&
                                <p className="review-content">
                                    <span>Rating:</span>
                                    {Array.from({ length: review.rating }, (_, i) =>
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="currentColor" d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379z" /></svg>
                                    )}
                                </p>}

                            <span className="text-bold">{review.fullname} </span>

                            <span>read it on {new Date(review.readAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>

                            <button className="remove-btn" onClick={() => onRemoveReview(id, review.id)}>x</button>
                        </li>)
                    }
                </ul>
                <AddReview bookId={id} onAddReview={onAddReview} />
            </div>
        </section>
    )
}