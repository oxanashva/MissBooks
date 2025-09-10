

export function RateBySelect() {
    return (
        <select className="rate-by-select">
            {[1, 2, 3, 4, 5].map(num => <option key={num}>{num}</option>)}
        </select>
    )
}