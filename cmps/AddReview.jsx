import { bookService } from "../services/book.service.js"
import { DynamicCmp } from "./dynamic-rate/DynamicCmp.jsx"

const { useState } = React

export function AddReview({ book, onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview())
    const [cmpType, setCmpType] = useState('select')

    function handleInput({ target }) {
        const field = target.name
        let value = target.value

        setReview(prevReviews => ({
            ...prevReviews,
            [field]: value,
            ratingFormat: cmpType
        }))
    }

    function saveReview(event) {
        event.preventDefault()
        onAddReview(book, review)
        setReview(bookService.getEmptyReview())
        setCmpType('select')
    }

    const { fullname, rating, readAt } = review

    return (
        <div className="add-review">
            <p className="text-bold text-gray">Add a Review</p>
            <form onSubmit={saveReview}>
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
                    <label >Select rating format:</label>

                    <div className="radio-btns">
                        <div>
                            <input
                                type="radio"
                                id="selectType"
                                name="cmp-type"
                                value="select"
                                checked={cmpType === "select"}
                                onChange={ev => setCmpType(ev.target.value)}
                            />
                            <label htmlFor="selectType">Number(1-5)</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="textboxType"
                                name="cmp-type"
                                value="textbox"
                                checked={cmpType === "textbox"}
                                onChange={ev => setCmpType(ev.target.value)}
                            />
                            <label htmlFor="textboxType">Text feedback</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="starsType"
                                name="cmp-type"
                                value="stars"
                                checked={cmpType === "stars"}
                                onChange={ev => setCmpType(ev.target.value)}
                            />
                            <label htmlFor="starsType">Stars</label>
                        </div>
                    </div>
                </div>

                <DynamicCmp cmpType={cmpType} name="rating" value={rating} handleInput={handleInput} />

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