const KEY = "DB_BOOKS"
import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook
}

function query(filterBy) {
    return storageService.query(KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => {
                    return book.listPrice.amount <= filterBy.price
                })
            }

            if (filterBy.category) {
                const regExp = new RegExp(filterBy.category, 'i')
                books = books.filter(book => {
                    return book.categories.some(category => regExp.test(category))
                })
            }

            return books
        })
}

function get(id) {
    return storageService.get(KEY, id)
}

function remove(id) {
    return storageService.remove(KEY, id)
}

function save(book) {
    if (book.id) {
        return storageService.put(KEY, book)
    } else {
        return storageService.post(KEY, book)
    }
}

function getDefaultFilter(filterBy = { title: '', price: 0, category: '' }) {
    return { title: filterBy.title, price: filterBy.price, category: filterBy.category }
}

function getEmptyBook(title = '', authors = [], categories = [], thumbnail = 'assets/img/placeholder.jpg', description = '', publishedDate = 0, pageCount = 0, price = 0, currency = 'EUR', isOnSale = false) {
    return {
        title,
        thumbnail,
        authors,
        categories,
        description,
        publishedDate,
        pageCount,
        listPrice: {
            amount: price,
            currencyCode: currency,
            isOnSale: isOnSale
        }
    }
}

function _createBooks() {
    let books = JSON.parse(localStorage.getItem(KEY)) || []

    if (!books || books.length === 0) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [utilService.makeLorem(1)],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024), description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://www.coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(KEY, books)
    }
}

_createBooks(20)