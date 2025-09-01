const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    if (txt.length <= length) {
        return <p>{txt}</p>
    }

    const displayedTxt = isExpanded ? txt : `${txt.substring(0, length)}...`

    const btnTxt = isExpanded ? 'Less' : 'More'

    return (
        <div className="long-txt">
            <p>{displayedTxt}</p>
            <button onClick={() => setIsExpanded(!isExpanded)}>Read {btnTxt}...</button>
        </div>
    )
}