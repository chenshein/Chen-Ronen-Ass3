class Contact {
  constructor(name, image, last_massage, message_time, active, unread, status) {
    this.name = name;
    this.image = image;
    this.last_massage = last_massage;
    this.message_time = message_time;
    this.active = active;
    this.unread = unread;
    this.status = status;
  }
}

const contacts = [
  new Contact(
    "Bob",
    "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c21pbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    "Hi im bob",
    "12:00",
    true,
    true,
    "online"
  ),
  new Contact(
    "Alice",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNtaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "Hawdy",
    "21/04/2023",
    false,
    false,
    "Ayoo!"
  )
];
const userDetailsMap = new Map();

function addUserDetails(username, password) {
  userDetailsMap.set(username, password);
}

function getUserDetails(username) {


  return userDetailsMap.get(username);
}


function createNewContact(name, image, last_massage, message_time, active, unread, status){
  contacts.push(new Contact(name, image, last_massage, message_time, active, unread, status));
}

function findContactByName(name) {
  return contacts.find((contact) => contact  && contact.name.toLowerCase() === name.toLowerCase());
}

export default  {Contact,contacts,createNewContact,findContactByName,addUserDetails, getUserDetails,userDetailsMap};