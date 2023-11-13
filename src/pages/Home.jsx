import { useRef, useState } from "react";
import Chat from "../components/Chat";

const Home = () => {
  const [room, setRoom] = useState(null);
  const inputRef = useRef();
  return (
    <div className="px-4 py-24 mx-auto max-w-7xl">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-[500px] border p-5 rounded-lg shadow-xl">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Enter Room Name
          </label>{" "}
          <input
            type="text"
            className="w-full p-2 border rounded-lg outline-purple-600"
            placeholder="room name"
            ref={inputRef}
          />
          <button
            onClick={() => setRoom(inputRef.current.value)}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg"
          >
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
