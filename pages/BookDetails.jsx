import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        bookService.get(params.id)
            .then(setBook)
            .catch(error => console.log(error))
    }, [])

    function getReadingLevel(pageCount) {
        if (pageCount > 500) {
            return 'Serious Reading'
        } else if (pageCount > 200) {
            return "Descent Reading"
        } else if (pageCount < 100) {
            return 'Light Reading'
        } else {
            return 'Normal Reading';
        }
    }

    function getBookStatus(publishedDate) {
        const currentYear = new Date().getFullYear()
        return (currentYear - publishedDate) > 10 ? 'Vintage' : 'New'
    }

    function getPriceStyle(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        else return ''
    }

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <div className="header">
                <h2 className="title">{book.title}</h2>
                <div className="img-container">
                    <img src={book.thumbnail} alt={book.title} />
                    {book.listPrice.isOnSale && <span className="sale">Sale</span>}
                </div>
            </div>
            <div className="meta">
                <p className="text-bold"><span className="text-gray">Authors:</span> {book.authors.join(', ')}</p>
                <p className="categories">
                    {book.categories.map(category => <span key={utilService.makeId()}>{category}</span>)}
                </p>
                <LongTxt txt={book.description} />
                <p className="level">{getReadingLevel(book.pageCount)}</p>
                <p className="status">{getBookStatus(book.publishedDate)}</p>
                <p className="text-bold">
                    <span className="text-gray">Price: </span>
                    <span className={`text-colored ${getPriceStyle(book.listPrice.amount)}`}>
                        {book.listPrice.amount} {book.listPrice.currencyCode}
                    </span>
                </p>
            </div>
        </section>
    )
}