import { utilService } from "../services/util.service.js"

export function BookPreview({ book }) {
    const { id, title, authors, categories, thumbnail, listPrice: { amount, currencyCode, isOnSale } } = book

    return (
        <article key={id} className="book-preview">
            <h2 className="title">{title}</h2>
            <p className="text-bold"><span className="text-gray">Authors:</span> {authors.join(', ')}</p>
            <p className="categories">
                {categories.map(category => <span key={utilService.makeId()}>{category}</span>)}
            </p>
            <img src={thumbnail} alt={title} />
            <p className="text-bold"><span className="text-gray">Price: </span><span className="text-colored">{amount} {currencyCode}</span></p>
            {isOnSale && <span className="sale">Sale</span>}
        </article>
    )
}