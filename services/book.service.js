const KEY = "DB_BOOKS"
import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
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

function getDefaultFilter(filterBy = { title: '', price: 0 }) {
    return { title: filterBy.title, price: filterBy.price }
}

function _createBooks(num) {
    let books = JSON.parse(localStorage.getItem(KEY))
    if (!books || books.length === 0) {
        books = [];
        for (let i = 0; i < num; i++) {
            const book = _createBook()
            books.push(book)
        }
    }
    utilService.saveToStorage(KEY, books)
}

function _createBook() {
    return {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
}

_createBooks(20)