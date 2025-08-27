const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function HomePage() {
    useEffect(() => {
        bookService.query().then(console.log())
    })
    return (
        <section className="home">
            <h2>Home Page</h2>
        </section>
    )
}

