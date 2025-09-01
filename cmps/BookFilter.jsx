const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [debouncedFilterBy, setDebouncedFilterBy] = useState(filterByToEdit)

    // // Alternate solution for filter without debounce

    // useEffect(() => {
    //     onSetFilterBy(filterByToEdit)
    // }, [filterByToEdit])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedFilterBy(filterByToEdit)
        }, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [filterByToEdit])

    useEffect(() => {
        onSetFilterBy(debouncedFilterBy)
    }, [debouncedFilterBy])

    function handleInput({ target }) {
        let value = target.value
        const field = target.name

        switch (target.type) {
            case 'number':
                value = +value || ''
            default: break
        }

        setFilterByToEdit(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))
    }

    const { title, price } = filterByToEdit

    return (
        <section className="book-filter">
            <h3>Filter By:</h3>
            <label htmlFor="title">Filter By Title</label>
            <input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={handleInput}
            />
            <label htmlFor="price">Filter By Price</label>
            <input
                type="number"
                name="price"
                value={price}
                onChange={handleInput}
            />
        </section>
    )
}

// https://dev.to/remejuan/react-debouncing-input-with-useeffect-3nhk