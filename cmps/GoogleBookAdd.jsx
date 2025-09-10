import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

export function GoogleBookAdd() {
    const [search, setSearch] = useState('')
    const [googleBooks, setGoogleBooks] = useState(null)
    const navigate = useNavigate()
    const elDialog = useRef(null)


    const debouncedSearch = useRef(utilService.debounce(onSearch)).current

    useEffect(() => {
        debouncedSearch(search)
    }, [search])

    useEffect(() => {
        elDialog.current.showModal()
    }, [])

    function onCloseModal() {
        elDialog.current.close()
        navigate('/book')
    }

    function onAddBook(bookToAdd) {
        bookService.addGoogleBook(bookToAdd)
            .then(savedBook => {
                setGoogleBooks(prevGoogleBooks => prevGoogleBooks.filter(book => book.id !== bookToAdd.id))
                navigate(`/book/${savedBook.id}`)
                showSuccessMsg('Book added, book id:' + savedBook.id)
            })
            .catch(error => {
                if (error.message) {
                    showErrorMsg(error.message)
                } else {
                    showErrorMsg('Cannot add book')
                }
                console.error('Error:', error)
            })
    }

    function handleInput(event) {
        setSearch(event.target.value)
    }

    function clearInput() {
        setSearch('')
        setGoogleBooks(null)
    }

    function onSearch(searchTerm) {
        if (!searchTerm) {
            setGoogleBooks(null)
            return
        }
        googleBookService.query(searchTerm)
            .then(setGoogleBooks)
            .catch(error => {
                console.error('error:', error)
                showErrorMsg('Cannot load books')
            })
    }

    return (
        <dialog ref={elDialog} className="book-add">
            <h2 className="text-center">Book Add</h2>
            <form>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search Google Books"
                    value={search}
                    onChange={handleInput}
                />
                <button className="clear-btn" type="button" onClick={clearInput}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </form>
            <ul>
                {googleBooks && googleBooks.map(book => <li key={book.id}>
                    <span>{book.volumeInfo.title}</span>
                    <button onClick={() => onAddBook(book)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="currentColor" d="M12 5.25a.75.75 0 0 1 .75.75v5.25H18a.75.75 0 0 1 0 1.5h-5.25V18a.75.75 0 0 1-1.5 0v-5.25H6a.75.75 0 0 1 0-1.5h5.25V6a.75.75 0 0 1 .75-.75" /></svg>
                    </button>
                </li>)}
            </ul>
            <button className="close" type="button" onClick={onCloseModal}>X</button>
        </dialog>
    )
}