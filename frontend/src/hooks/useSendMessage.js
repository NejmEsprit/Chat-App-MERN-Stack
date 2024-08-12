import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    console.log('first', selectedConversation._id)

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            })
            const data = await res.json()
            console.log('data',data)
            if (data.error) throw new Error(data.message)
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    return { sendMessage, loading }
}

export default useSendMessage