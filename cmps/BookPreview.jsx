const { useState, useEffect } = React

export function BookPreview({ book }) {
    const { id, title, listPrice: { amount, currencyCode, isOnSale } } = book

    return (
        <article key={id} className="book-preview">
            <h3 className="title">{title}</h3>
            <span>Price: <span className="colored-text bold-text">{amount} {currencyCode}</span></span>
            {isOnSale && <span className="sale">Sale</span>}
        </article>
    )
}