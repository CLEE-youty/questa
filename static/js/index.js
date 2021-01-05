const socket = io();
const message_form = document.getElementById('message_form');
const editChat = document.getElementById('editChat');
const sendChat = document.getElementById('sendChat');
const receiveChat = document.getElementById('receiveChat');

/**
 * メッセージ送信
 */
const submitText = () => {
  if(!isIDStrings()) {
    alert('userIDが無効です')
    location.reload();
    return;
  }
  if(editChat.value) {
    const sendInfo = {
      userID: isIDStrings(),
      msgTxt: editChat.value,
    }
    socket.emit('message', sendInfo);
    editChat.value = '';
  }
}
sendChat.addEventListener('click', submitText);

/**
 * メッセージ受信
 */
socket.on('message', msg => {
  const newElement = document.createElement('li');
  const newUserIDSpan = document.createElement('span');
  const newContentSpan = document.createElement('span');
  newContentSpan.classList.add('chat_content--left')
  const newUserID = document.createTextNode(`${msg.userID}さん`);
  const newContent = document.createTextNode(msg.msgTxt);
  newUserIDSpan.appendChild(newUserID);
  newContentSpan.appendChild(newContent);
  newElement.appendChild(newUserIDSpan);
  newElement.appendChild(newContentSpan);
  receiveChat.appendChild(newElement);

  scrollToEnd();
})

/**
 * userID
 */
const randomStrings = () => {
  var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  var N=8
  const randomSt = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')
  return randomSt;
}

const chkIDStrings = () => {
  return(isIDStrings() ? true : false);
}

const setIDStrings = () => {
  if(chkIDStrings()) {
    return;
  } else {
    localStorage.setItem('userID', randomStrings());
  }
}

const isIDStrings = () => {
  return(localStorage.getItem('userID'));
}

setIDStrings();

/**
 * スクロールコンテンツを常に最新表示
 */
function scrollToEnd() {
  const messagesArea = document.getElementById('scrollInner');
  messagesArea.scrollTop = messagesArea.scrollHeight;
}