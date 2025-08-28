const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterParam, setFilterParam] = useState('title')
    const [newFilterBy, setNewFilterBy] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(newFilterBy)
    }, [newFilterBy])

    function handleSelect(ev) {
        setFilterParam(ev.target.value)
    }

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

    return (
        <section className="book-filter">
            <label htmlFor="filter">Filter by:</label>
            <select
                name="filter"
                id="filter"
                onChange={handleSelect}
                value={filterParam}
            >
                <option value="title">title</option>
                <option value="price">price</option>
            </select>
            <input
                type={filterParam === 'title' ? 'text' : 'number'}
                name={filterParam === 'title' ? 'title' : 'price'}
                value={newFilterBy[filterParam]}
                onChange={handleInput}
            />
        </section>
    )
}