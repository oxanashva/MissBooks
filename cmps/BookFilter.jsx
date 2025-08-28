const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [newFilterBy, setNewFilterBy] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(newFilterBy)
    }, [newFilterBy])

    function handleInput({ target }) {
        let value = target.value
        const field = target.name

        switch (target.type) {
            case 'number':
                value = +value || ''
            default: break
        }

        setNewFilterBy(prevVal => ({
            ...prevVal,
            [field]: value
        }))
    }

    const { title, price } = newFilterBy

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