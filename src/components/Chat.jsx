import { useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { AuthContext } from "../providers/AuthProvider";
const Chat = ({ room }) => {
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        setMessages(messages);
      });
    });
    return () => unsubscribe();
  }, [messagesRef, room]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;
    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: user.displayName,
        room,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNewMessage("");
  };
  return (
    <div className="px-4 py-24 mx-auto max-w-7xl ">
      <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-[500px] border p-5 rounded-lg shadow-xl ">
        <div className="text-center my-5 font-bold text-3xl bg-lime-500 py-2">
          <h1>
            Welcome to : <span className="uppercase">{room}</span>
          </h1>
        </div>
        <div className="max-h-[450px]">
          {messages.map((message, idx) => (
            <div key={idx}>
              {/* <span className="text-xs">{message.user}</span> */}
              <h1>{message.text}</h1>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="w-full p-2 border rounded-l-lg border-r-0 outline-purple-600"
            placeholder="type your message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-r-lg text-white font-semibold"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
