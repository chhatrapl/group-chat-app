import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname,join } from "node:path";




const app = express();
const server = createServer(app);
const io = new Server(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});


io.on("connection", (socket)=>{
    console.log("user online")

    socket.on('message', ({msg,name})=>{
        console.log("message: ", msg);
        io.emit("message", {name,msg});
    })

    socket.on("disconnect",()=>{
        console.log("user offline!")
    })

})


server.listen(3000,()=>{
    console.log(`server is runnig.`)
})