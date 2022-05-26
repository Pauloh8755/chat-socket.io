const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

//emit=> para emitir uma informação
//on=> para escutar uma informação

socket.emit("select_room", {
  username,
  room,
});

document.getElementById("message_input").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    const message = e.target.value;

    const data = {
      room,
      message,
      username,
    };
    socket.emit("message", data);

    e.target.value = "";
  }
});

socket.on("message", (data) => {
  const messageDiv = document.getElementById("message");
  console.log(data);
  //47.13
});
