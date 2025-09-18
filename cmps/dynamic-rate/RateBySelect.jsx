

export function RateBySelect({ cmpType, name, value, handleInput, totalStars = 5 }) {
    const starsArray = Array.from({ length: totalStars }, (_, i) => i + 1)

    return (
        <select
            className="rate-by-select"
            id={cmpType}
            name={name}
            value={value}
            onChange={handleInput}
        >
            {starsArray.map(num => <option key={num} value={num}>{num}</option>)}
        </select>
    )
}