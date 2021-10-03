const socket = io();
const form = document.querySelector("#message-form");
const messages = document.querySelector(".messages");

/****** message submission to server ******/
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //send the username and message to server
  socket.emit("messages", {
    username: form.elements.name.value,
    message: form.elements.message.value,
  });

  //empty the form
  form.elements.name.value = "";
  form.elements.message.value = "";
});

/****** receiving messages from server ******/
socket.on("response", (data) => {
  const div = document.createElement("div");
  div.classList.add("msg");
  div.innerHTML = `<span class="username">${data.username}</span> <span class="chat">${data.message}</span>`;
  messages.appendChild(div);
});
