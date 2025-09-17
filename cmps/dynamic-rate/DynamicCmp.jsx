import { RateBySelect } from "./RateBySelect.jsx"
import { RateByStars } from "./RateByStars.jsx"
import { RateByTextbox } from "./RateByTextbox.jsx"

export function DynamicCmp(props) {
    const cmpMaps = {
        select: <RateBySelect {...props} />,
        textbox: <RateByTextbox {...props} />,
        stars: <RateByStars {...props} />
    }

    return (
        <div className="field">
            <label htmlFor={props.cmpType}>Your Rating</label>
            {cmpMaps[props.cmpType]}
        </div>
    )
}