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

// function _createBooks(num) {
//     let books = JSON.parse(localStorage.getItem(KEY))
//     if (!books || books.length === 0) {
//         books = [];
//         for (let i = 0; i < num; i++) {
//             const book = _createBook()
//             books.push(book)
//         }
//     }
//     utilService.saveToStorage(KEY, books)
// }

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
    }
    utilService.saveToStorage(KEY, books)
}

_createBooks(20)