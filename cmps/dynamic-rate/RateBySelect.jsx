

export function RateBySelect({ name, value, handleInput }) {
    return (
        <select
            className="rate-by-select"
            name={name}
            value={value}
            onChange={handleInput}
        >
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
        </select>
    )
}