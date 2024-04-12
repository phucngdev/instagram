import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { Route, Routes, useLocation } from "react-router-dom";
import PublicRouter from "./routes/PublicRouter";
import PrivateRouter from "./routes/PrivateRouter";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRouter />}></Route>
        <Route path="/accounts/login" element={<Login />} />
        <Route path="/accounts/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRouter />}></Route>
      </Routes>
    </>
  );
}

export default App;

// socket chạy
// import React, { useState, useEffect, useRef } from "react";
// import socketIOClient from "socket.io-client";
// import "./App.css";
// const host = "http://localhost:3000";

// function App() {
//   const [mess, setMess] = useState([]);
//   const [message, setMessage] = useState("");
//   const [id, setId] = useState();

//   console.log(mess);

//   const socketRef = useRef();
//   const messagesEnd = useRef();

//   useEffect(() => {
//     socketRef.current = socketIOClient.connect(host);

//     socketRef.current.on("getId", (data) => {
//       setId(data);
//     });

//     socketRef.current.on("sendDataServer", (dataGot) => {
//       setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
//       scrollToBottom();
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message !== null) {
//       const msg = {
//         content: message,
//         id: id,
//       };
//       socketRef.current.emit("sendDataClient", msg);
//       setMessage("");
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEnd.current.scrollIntoView({ behavior: "smooth" });
//   };

//   const renderMess = mess?.map((m, index) => (
//     <div
//       key={index}
//       className={`${m.id === id ? "your-message" : "other-people"} chat-item`}
//     >
//       {m.content}
//     </div>
//   ));

//   const handleChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const onEnterPress = (e) => {
//     if (e.keyCode == 13 && e.shiftKey == false) {
//       sendMessage();
//     }
//   };

//   return (
//     <div class="box-chat">
//       <div class="box-chat_message">
//         {renderMess}
//         <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
//       </div>

//       <div class="send-box">
//         <textarea
//           value={message}
//           onKeyDown={onEnterPress}
//           onChange={handleChange}
//           placeholder="Nhập tin nhắn ..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;
