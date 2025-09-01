import { bookService } from "../services/book.service.js"

const { useState, useEffect, useRef } = React

export function BookEdit({ book, isEditOpen, onCloseModal, onAddBook, onUpdateBook }) {
    const [bookToEdit, setBookToEdit] = useState(book ? { ...book } : bookService.getEmptyBook())

    const elDialog = useRef(null)

    useEffect(() => {
        if (isEditOpen) {
            elDialog.current.showModal()
        } else {
            elDialog.current.close()
        }
    }, [isEditOpen])

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

    function onSaveBook() {
        bookService.save(bookToEdit)
            .then((savedBook) => {
                if (bookToEdit.id) onUpdateBook(savedBook)
                else onAddBook(savedBook)

                onCloseModal()
            }).catch(error => console.log(error))
    }

    return (
        <dialog ref={elDialog} className="book-edit">
            <h2>Book Edit</h2>
            <form method="dialog" onSubmit={onSaveBook}>
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