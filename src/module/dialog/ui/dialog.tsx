import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { chatUsers } from "../../navbar/ui/navBar.tsx";

type MessageType = {
    sender: 'user' | 'ai',
        content: string;
}

const Dialog = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const user = chatUsers.find(u => u.id === Number(id));

    useEffect(() => {
        if (id) {
            const saved = localStorage.getItem(`chat_${id}`);
            if (saved) {
                const oldMessages = JSON.parse(saved);
                if (Array.isArray(oldMessages) && oldMessages.length > 0 && typeof oldMessages[0] === "string") {
                    const newMessages : MessageType[] = oldMessages.map((msg: string) => ({ sender: "user", content: msg }));
                    setMessages(newMessages);
                    saveMessages(newMessages);
                } else {
                    setMessages(oldMessages);
                }
            } else {
                setMessages([]);
            }
        }
    }, [id]);


    const saveMessages = (msgs: (MessageType | { sender: string; content: string })[]) => {
        if (id) {
            localStorage.setItem(`chat_${id}`, JSON.stringify(msgs));
        }
    };




    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const updated : MessageType[] = [...messages, {sender: 'user' , content: newMessage}];
        setMessages(updated);
        saveMessages(updated);

        setNewMessage('');

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama3-70b-8192",
                    messages: [
                        {
                            role: "user",
                            content: newMessage
                        }
                    ]
                })
            });

            const data = await response.json();
            const botReply = data.choices?.[0]?.message?.content;

            if (botReply) {
                const updatedWithBot : MessageType[] = [...updated, {sender: 'ai',content:  botReply}];
                setMessages(updatedWithBot);
                saveMessages(updatedWithBot);
            }
        } catch (error) {
            console.error("Ошибка GPT запроса:", error);
        }
    };

    return (
        <div className="flex w-screen flex-col h-screen p-4 bg-white">
            <div className="flex-1 overflow-y-auto border p-4 rounded bg-gray-100 mb-4 flex flex-col">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`mb-2 p-2 rounded max-w-[70%] relative ${
                            msg.sender === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
                        }`}
                    >
                        {msg.content}
                        {msg.sender === 'user' && (
                            <img
                                src={user?.check === true ? "/checksOk.png" : "/checksNo.png"}
                                className="w-4 h-4 absolute right-0 bottom-0"
                                alt=""
                            />
                        )}
                    </div>
                ))}
            </div>


            <div className="flex gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="flex-1 border rounded p-2"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSend();
                        }
                    }}
                />
                <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default Dialog;
