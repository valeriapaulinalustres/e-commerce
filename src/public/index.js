const socketClient = io();

// elementos
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const newProducts = document.getElementById("newProducts");
const formulario = document.getElementById("formulario");

// *** CHAT *** */

const messageInput = document.getElementById("message");
const formularioChat = document.getElementById("formularioChat");
const alias = document.getElementById("alias");


formularioChat.onsubmit = (e) => {
  e.preventDefault();
  const chat = {
    user: alias.value,
    message: messageInput.value,
  };
  socketClient.emit("update-chat", chat);

  messageInput.value = "";
};
// render-chat
socketClient.on("chat", manejarEventoChat);
async function manejarEventoChat(chat) {

  const recursoRemoto = await fetch("/hbs/chat.hbs");
  const textoPlantilla = await recursoRemoto.text();
  const functionTemplate = Handlebars.compile(textoPlantilla);

  const html = functionTemplate({ chat });
  document.getElementById("chat").innerHTML = html;
}

function addProductToCart() {
  console.log("clic");
}
