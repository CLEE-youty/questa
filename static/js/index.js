const socket = io();
const message_form = document.getElementById('message_form');
const editChat = document.getElementById('editChat');
const sendChat = document.getElementById('sendChat');
const receiveChat = document.getElementById('receiveChat');

const submitText = () => {
  if(editChat.value) {
    socket.emit('message', editChat.value);
    editChat.value = '';
  }
  return false;
}
sendChat.addEventListener('click', submitText)

socket.on('message',  msg => {
  const newElement = document.createElement('li');
  const newContent = document.createTextNode(msg);
  newElement.appendChild(newContent);
  receiveChat.appendChild(newElement);
})