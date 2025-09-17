import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onSetFilterBy, onClearFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    const debouncedFilterByToEdit = useRef(utilService.debounce(onSetFilterBy)).current

    useEffect(() => {
        debouncedFilterByToEdit(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])

    function handleInput({ target }) {
        let value = target.value
        const field = target.name

        switch (target.type) {
            case 'number':
                value = target.value === '' ? '' : +target.value
                break
            default: break
        }

        setFilterByToEdit(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))
    }

    const { title, price, category } = filterByToEdit

    return (
        <section className="book-filter">
            <h3>Filter By:</h3>
            <div className="filters-container">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Title"
                    onChange={handleInput}
                />
                <label htmlFor="price">Max Price</label>
                <input
                    type="number"
                    name="price"
                    value={price}
                    min="0"
                    onChange={handleInput}
                />
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={handleInput}
                />
                <button onClick={onClearFilter}>Clear Filter</button>
            </div>
        </section>
    )
}

// https://dev.to/remejuan/react-debouncing-input-with-useeffect-3nhk