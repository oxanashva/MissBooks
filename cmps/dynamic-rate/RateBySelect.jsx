

export function RateBySelect({ name, value, handleInput, totalStars = 5 }) {
    const starsArray = Array.from({ length: totalStars }, (_, i) => i + 1)

    return (
        <select
            className="rate-by-select"
            name={name}
            value={value}
            onChange={handleInput}
        >
            {starsArray.map(num => <option key={num} value={num}>{num}</option>)}
        </select>
    )
}