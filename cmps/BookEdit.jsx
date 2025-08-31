const { useState, useEffect, useRef } = React

export function BookEdit({ isEditOpen, onCloseModal }) {
    const [formValues, setFormValues] = useState({ title: '', price: 0 })
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

        setFormValues(prevValues => ({
            ...prevValues,
            [field]: value
        }))
    }

    function handleClose() {
        onCloseModal()
        console.log('formValues', formValues)
    }

    return (
        <dialog ref={elDialog} className="book-edit">
            <h2>Book Edit</h2>
            <form method="dialog">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        onChange={handleInput}
                    />
                </div>
                <button type="submit" onClick={handleClose}>Save</button>
            </form>
            <button className="close" onClick={handleClose}>X</button>
        </dialog>
    )
}