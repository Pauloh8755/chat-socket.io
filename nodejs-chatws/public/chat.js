const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

//emit=> para emitir uma informação
//on=> para escutar uma informação

const createMessage = (data) => {
  const messageDiv = document.getElementById("messages");
  console.log(data);

  messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong>${data.username}</strong> <span>${data.text} - ${dayjs(
    data.createdAt
  ).format("DD/MM HH:mm")} </span>
      </label>
    </div>
  `;
};

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`;

socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    messages.map(createMessage);
  }
);

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
  createMessage(data);
  //47.13
});

document.getElementById("logout").addEventListener("click", () => {
  window.location.href = "/index.html";
});
