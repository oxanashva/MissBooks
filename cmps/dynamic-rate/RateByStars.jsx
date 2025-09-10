

export function RateByStars({ name, handleInput }) {
    return (
        <div class='rate-by-stars'>
            {[1, 2, 3, 4, 5].map(num => <span key={num} onClick={() => handleInput({ target: { name, value: num } })}>⭐</span>)}
        </div>
    )
}