import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function AddReview({ bookId, onAddReview }) {
    const [reviews, setReviews] = useState(bookService.getEmptyReview())

    function handleInput({ target }) {
        const field = target.name
        let value = target.value

        setReviews(prevReviews => ({
            ...prevReviews,
            [field]: value
        }))
    }

    function onSaveReview(event) {
        event.preventDefault()
        bookService.addReview(bookId, reviews)
            .then((book) => {
                onAddReview(book)
                setReviews(bookService.getEmptyReview())
                showSuccessMsg('Review added')
            })
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot add review')
            })
    }

    const { fullname, rating, readAt } = reviews

    return (
        <div className="add-review">
            <p className="text-bold text-gray">Add a Review</p>
            <form onSubmit={onSaveReview}>
                <div className="field">
                    <label htmlFor="fullname">Your Full Name</label>
                    <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        value={fullname}
                        onChange={handleInput}
                    />
                </div>
                <div className="field">
                    <label htmlFor="rating">Your Rating (1-5 stars)</label>
                    <select
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={handleInput}
                    >
                        {[1, 2, 3, 4, 5].map(num => <option key={num}>{num}</option>)}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="readAt">Date You Read It</label>
                    <input
                        id="readAt"
                        name="readAt"
                        type="date"
                        value={readAt}
                        onChange={handleInput}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}