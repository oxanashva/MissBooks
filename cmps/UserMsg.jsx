import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(onCloseMsg, 1500)
        })

        return () => {
            unsubscribe()
        }
    })

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null

    return (
        <div className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
            <button>X</button>
        </div>
    )
}