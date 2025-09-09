import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, useOutletContext } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookId } = useParams()
    const { onSaveBook } = useOutletContext()

    const elDialog = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (bookId) {
            bookService.get(bookId)
                .then(setBookToEdit)
                .catch(error => {
                    console.error('Error:', error);
                    showErrorMsg('Cannot load book for edit:')
                    navigate('/books')
                })
        }
    }, [bookId])

    useEffect(() => {
        elDialog.current.showModal()
    }, [])

    function onCloseModal() {
        elDialog.current.close()
        navigate(-1)
    }

    function handleInput({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
                value = +value || ''
                break
            case 'radio':
                value = value === 'true'
                break
            case 'checkbox':
                const currentValues = bookToEdit[field] || []

                if (currentValues.includes(value)) {
                    value = currentValues.filter(v => v !== value)
                } else {
                    value = [...currentValues, value]
                }

                break
            default: break
        }

        setBookToEdit(prevBook => {
            const [parentKey, childKey] = field.split('.')

            if (childKey) {
                return {
                    ...prevBook,
                    [parentKey]: {
                        ...prevBook[parentKey],
                        [childKey]: value
                    }
                }
            } else {
                return {
                    ...prevBook,
                    [field]: value
                }
            }
        })
    }

    function saveBook(event) {
        event.preventDefault()

        if (!bookToEdit.title || !bookToEdit.authors.length === 0 || bookToEdit.categories.length === 0 || !bookToEdit.publishedDate || !bookToEdit.pageCount || !bookToEdit.listPrice.amount) {
            alert('Please fill title, authors,categories, published date, page count and price!')
            return
        }

        const bookToSave = {
            ...bookToEdit,
            authors: bookToEdit.authors.split(',').map(author => author.trim())
        }


        bookService.save(bookToSave)
            .then((savedBook) => {
                onSaveBook(savedBook)
                showSuccessMsg(`Book saved (id: ${savedBook.id})`)
                onCloseModal()
            }).catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot save book')
            })
    }

    const availableCategories = ['Love', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry', 'Religion', 'Fiction']

    return (
        <dialog ref={elDialog} className="book-edit">
            <h2>Book Edit</h2>
            <form onSubmit={saveBook}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={bookToEdit.title}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label>Authors<br />(separate names with commas)</label>
                    <input
                        id="authors"
                        name="authors"
                        type="text"
                        value={bookToEdit.authors}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <div>
                        {availableCategories.map(category => (
                            <label key={category}>
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={category}
                                    checked={bookToEdit.categories.includes(category)}
                                    onChange={handleInput}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        value={bookToEdit.description}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publishedDate">Published Date</label>
                    <input
                        id="publishedDate"
                        name="publishedDate"
                        type="number"
                        value={bookToEdit.publishedDate}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Page Count</label>
                    <input
                        id="pageCount"
                        name="pageCount"
                        type="number"
                        value={bookToEdit.pageCount}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="listPrice.amount"
                        type="number"
                        value={bookToEdit.listPrice.amount}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="currency">Currency</label>
                    <select
                        id="currency"
                        name="listPrice.currencyCode"
                        type="text"
                        value={bookToEdit.listPrice.currencyCode}
                        onChange={handleInput}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="ILS">ILS</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Is On Sale</label>
                    <div>
                        <label>
                            <input
                                id="isOnSale-yes"
                                name="listPrice.isOnSale"
                                type="radio"
                                value="true"
                                checked={bookToEdit.listPrice.isOnSale === true}
                                onChange={handleInput}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                id="isOnSale-no"
                                name="listPrice.isOnSale"
                                type="radio"
                                value="false"
                                checked={bookToEdit.listPrice.isOnSale === false}
                                onChange={handleInput}
                            />
                            No
                        </label>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
            <button className="close" type="button" onClick={onCloseModal}>X</button>
        </dialog>
    )
}