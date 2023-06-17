import React,{useState,useEffect} from "react";
import './css/chat.css'
import { socket } from '../socket';


function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');


    // socket.on('new message', (message) => {
    //     console.log(">>>>>>>>>>>>",message);
    //     setMessages((prevMessages) => [...prevMessages, message]);
    // });

    useEffect(() => {
        console.log("haiiiiii");
        // Listen for incoming messages
        socket.on('new message', (message) => {
            console.log(">>>>>>>>>>>>",message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up event listener when component unmounts
        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        document.getElementById('input').value = '';
        if (input) {
            // Send message to server
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return (
        <div>
            <div className="container-fluid" id="chat_box">
                <ul className="chat-messages">
                    <br />
                    <li className="chat-message left">
                        <div className="chat-content">
                            <p className="chat-text">Hello! How are you?</p>
                        </div>
                    </li>
                    <br />
                    <li className="chat-message right">
                        <div className="chat-content">
                            <p className="chat-text">I'm fine, thanks! How about you?</p>
                        </div>
                    </li>
                </ul>
            </div>
            <form id="form" action="">
                <input id="input" onChange={(e)=> setInput(e.target.value)} autoComplete="off" placeholder="Type your message..." />
                <button onClick={sendMessage}  type="submit">Send</button>
            </form>


        </div>
    )

}

export default Chat;