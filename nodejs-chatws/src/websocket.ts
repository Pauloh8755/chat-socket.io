import { io } from "./app";

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
}

interface Message {
  room: string;
  text: string;
  createdAt: Date;
  username: string;
}

const users: RoomUser[] = [];

const messages: Message[] = [];

io.on("connection", (socket) => {
  socket.on("select_room", (data) => {
    socket.join(data.room);

    const userInRoom = users.find(
      (user) => user.username === data.username && user.room == data.room
    );

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        username: data.username,
        socket_id: socket.id,
      });
    }
  });

  socket.on("message", (data) => {
    //salvar as mensagens e enviar para usuarios da sala
    const message: Message = {
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: new Date(),
    };

    messages.push(message);
    console.log(messages);

    //Enviar para usuarios da sala
    io.to(data.room).emit("message", message);
  });
});
