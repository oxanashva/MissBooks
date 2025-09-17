import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { AddReview } from "../cmps/AddReview.jsx"
import { RateByStars } from "../cmps/dynamic-rate/RateByStars.jsx"

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

    function onAddReview(book, review) {
        bookService.addReview(book, review)
            .then(updatedBook => {
                setBook(updatedBook)
                showSuccessMsg('Review added')
            })
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot add review')
            })
    }

    function onRemoveReview(book, reviewId) {
        bookService.removeReview(book, reviewId)
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

    const { title, thumbnail, authors, categories, description, pageCount, publishedDate, prevBookId, nextBookId, listPrice: { amount, currencyCode, isOnSale }, reviews } = book

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
                                    <span className="review-label">Rating:</span>
                                    <span className="text-italic">{review.rating}/5 stars</span>
                                </p>
                            }

                            {review.ratingFormat === "textbox" &&
                                <p className="review-content">
                                    <span className="review-label">Review:</span>
                                    <span className="text-italic">{review.rating}</span>
                                </p>
                            }

                            {review.ratingFormat === "stars" &&
                                <div className="review-content">
                                    <span className="review-label">Rating:</span>
                                    <RateByStars value={review.rating} size={12} readOnly={true} />
                                </div>
                            }

                            <span className="text-bold">{review.fullname} </span>

                            <span>read it on {new Date(review.readAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>

                            <button className="remove-btn" onClick={() => onRemoveReview(book, review.id)}>x</button>
                        </li>)
                    }
                </ul>
                <AddReview book={book} onAddReview={onAddReview} />
            </div>
        </section>
    )
}