import { useState, useEffect } from 'react'; // Import useEffect for initial system message
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import Navbar from '../components/Navbar';
//key local doesnt work for others

const API_KEY = "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";

// Define the initial system message outside the App component

function App() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm WealthWizz! Your personal assistant for retirement planning.",
            sender: "WealthWizz",
        },
    ]);


    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setTyping(true);
        await processMessageToChatGPT(newMessages);

    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            }
            return { role: role, content: messageObject.message }
        });

        const systemMessage = {
            role: "system",
            content: "Explain all concpets like I am part of Gen Z."
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data.choices[0].message.content)
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            )
            setTyping(false);
        })
    }



    return (
        <div className='bg-black/80'>
            <Navbar />
            <div className='bg-gradient-to-b from-blue-700 to-blue-900 text-white py-10 text-center'>
                <h1 className="text-4xl font-semibold">WealthWizz - Your Retirement Chat Bot</h1>
                <p className="text-lg mt-4">Welcome to <b>WealthWizz</b>, your personal assistant for retirement planning. Feel free to ask any questions about retirement, savings, and financial planning. I'm here to help!</p>
            </div>
            <div className="flex justify-center">
                <div style={{ position: "relative", height: "700px", width: "700px" }}>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={typing ? <TypingIndicator content="WealthWizz is typing" /> : null}>

                                {messages.map((message, i) => {
                                    return <Message key={i} model={message} />
                                })}
                            </MessageList>
                            <MessageInput placeholder="Type message here" onSend={handleSend} />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </div>
    );
}
export default App;
