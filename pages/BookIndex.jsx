import { BookList } from "../cmps/BookList.jsx"
import { BookPreview } from "../cmps/BookPreview.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    return (
        <section className="book-index">
            <h2>Book Index</h2>
            <BookList />
            <BookPreview />
            <BookDetails />
            <BookFilter />
            <BookEdit />
        </section>
    )
}