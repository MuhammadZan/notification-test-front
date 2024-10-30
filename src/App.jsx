import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  // const [socket] = useState(() =>
  //   io("http://localhost:5000", { autoConnect: false })
  // );

  // useEffect(() => {
  //   if(Notification.permission==="default" || Notification.permission==="denied"){
  //     Notification.requestPermission()
  //   }
  //   socket.connect();
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //   });
    
  //   socket.on("notification",(data)=>{
  //     console.log(data)
  //     if(Notification.permission==="granted"){
  //       new Notification("New Notification",{
  //         body:data.message
  //       })
  //     }
  //   })

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);
   useEffect(() => {
     if ("serviceWorker" in navigator) {
       navigator.serviceWorker
         .register("/sw.js") // Registers the service worker in public/sw.js
         .then((registration) => {
           console.log("Service Worker registered:", registration);

           Notification.requestPermission().then(async (permission) => {
             if (permission === "granted") {
               const subscription = await registration.pushManager.subscribe({
                 userVisibleOnly: true,
                 applicationServerKey:
                   "BNZ4HSyfHTw_BuOH-7qHw5RgOQhQmneALpm2IuDdC0e66YE5urm3qKf6PBiQ473FYhbk_FzrOUEzGIgRl9o_MQ8", 
               });

               await fetch("http://localhost:5000/subscribe", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify(subscription),
               });

               console.log("Push subscription:", subscription);
             } else {
               console.warn("Notification permission not granted.");
             }
           });
         })
         .catch((error) => {
           console.error("Service Worker registration failed:", error);
         });
     }
   }, []);
  return <div className="App">Notification test</div>;

}

export default App;
