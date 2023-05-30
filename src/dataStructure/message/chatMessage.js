import { ContactsList } from "../contact/contactList";
import ApiRequests from "../../server/API/ApiRequests";
class chatMessage {
  constructor(message, time, date, read, id, targetId) {
    this.id = id;
    this.targetId = targetId;
    this.message = message;
    this.time = time;
    this.date = date;
    this.read = read;
  }
}

async function createMessageAPI(newMessage) {
  const apiRequests = await ApiRequests();
  await apiRequests.apiNewMessage(newMessage);
}

async function createMessage(message, id, targetId, read) {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  time = hours + ":" + minutes;

  const newMessage = new chatMessage(message, time, today, read, id, targetId);
  Message.addMessageToContactById(newMessage);
  await createMessageAPI(newMessage);
  return newMessage;
}

function addMessageToContactById(message) {
  const user = ContactsList.findContactById(message.targetId);
  const target = ContactsList.findContactById(message.id);
  if (!user || !target) {
    return;
  }
  if (!user.chatHistory.get(target.id)) {
    user.chatHistory.set(target.id, [message]);
    target.chatHistory.set(user.id, [message]);
  } else {
    user.chatHistory.get(target.id).push(message);
    if (user !== target) {
      target.chatHistory.get(user.id).push(message);
    }
  }
}

function getChatHistoryById(id) {
  const contact = ContactsList.findContactById(id);
  return contact && contact.chatHistory;
}

const printChatLog = (from, to) => {
  const chatHistory = Message.getChatHistoryById(from);
  const chatLog = chatHistory.get(to);
  chatLog.forEach((message) => {
    const { message: msg, time, date, read } = message;
    console.log(
      `from ${ContactsList.findContactById(from).name} to ${
        ContactsList.findContactById(to).name
      } at ${time} on ${date}: ${msg} - ${read ? "read" : "unread"}`
    );
  });
};

const getChatHistory = (id) => {
  const contact = ContactsList.findContactById(id);
  return contact && contact.chatHistory;
};

export const Message = {
  createMessage,
  chatMessage,
  getChatHistoryById,
  addMessageToContactById,
  printChatLog,
  getChatHistory,
};
