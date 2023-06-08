import { ContactsList } from "./contactList";

export class Contacts {
  constructor(username, name, password, image, active, status) {
    this.id = username;
    this.name = name;
    this.password = password;
    this.image = image;
    this.active = active;
    this.status = status;
    const lastMessageTime = new Date();
    this.contacts = new Map();
    this.chatHistory = new Map();
  }

  static createContact(
    username,
    name,
    password = null,
    image,
    active = false,
    status = "Hey there! I am using ChitChat."
  ) {
    const newContact = new Contacts(
      username,
      name,
      password,
      image,
      active,
      status
    );
    ContactsList.addContact(newContact);
    return newContact;
  }
}
