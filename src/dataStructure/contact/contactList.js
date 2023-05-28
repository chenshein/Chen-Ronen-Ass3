const contactsList = [];
const contactsMap = new Map();

const getList = () => {
  return contactsList;
};

const getMap = () => {
  return contactsMap;
};

const addContact = (contact) => {
  if (contactsList.find((c) => c.id === contact.id)) {
    return;
  }
  contactsList.push(contact);
  contactsMap.set(contact.id, contact);
};

const removeContact = (contact) => {
  contactsList.splice(contactsList.indexOf(contact), 1);
  contactsMap.delete(contact.id);
};

const addContacts = (contacts) => {
  const newContacts = contacts.filter(
    (contact) => !contactsMap.has(contact.id)
  );
  contactsList.push(...newContacts);
  newContacts.forEach((contact) => contactsMap.set(contact.id, contact));
};

const findContactById = (id) => {
  return contactsMap.get(id);
};

const findContactByName = (name) => {
  return contactsList.find((contact) => contact.name === name);
};

const findContactByNameIgnoreCase = (name) => {
  return contactsList.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
};
const findContactByIdIgnoreCase = (id) => {
  return contactsList.find(
    (contact) => contact.id.toLowerCase() === id.toLowerCase()
  );
};

export const ContactsList = {
  getList,
  getMap,
  addContact,
  removeContact,
  addContacts,
  findContactById,
  findContactByName,
  findContactByNameIgnoreCase,
  findContactByIdIgnoreCase,
};
