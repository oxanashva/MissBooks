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
                console.log(savedBook);

                onCloseModal()
            })
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
                        value={bookToEdit.price}
                        onChange={handleInput}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
            <button className="close" type="button" onClick={onCloseModal}>X</button>
        </dialog>
    )
}