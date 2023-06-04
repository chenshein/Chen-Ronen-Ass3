import { ContactScreen } from "./ContactScreen/ContactScreen";
import "./style/index.css";
import { ChatScreen } from "./ChatScreen/ChatScreen";
import { useEffect, useState } from "react";
import { Modals } from "./Modals";
import { Message } from "../../../dataStructure/message/chatMessage";
import { ContactsList } from "../../../dataStructure/contact/contactList";
import { useNavigate } from "react-router-dom";

export const ChatPage = ({
  currentUser,
  contacts,
  setContacts,
  contactsListRef,
  handleUserChange,
}) => {
  const history = useNavigate();
  //revert to login page if no user is selected
  useEffect(() => {
    if (!currentUser) {
      history("/");
    }
  }, [currentUser, history]);

  // const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [currnetUserHistory, setCurrentUserHistory] = useState(null);
  const [query, setQuery] = useState("");

  const displayContacts = () => {
    if (query === "") {
      return contacts;
    } else {
      return contacts.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatScreenBottom = document.querySelector(".active_chatScreen");
      chatScreenBottom.scrollTop = chatScreenBottom.scrollHeight;
    }, 50);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sortContacts = (newContacts) => {
    return newContacts.sort((a, b) => {
      const aHistory = a.chatHistory.get(currentUser.id);
      const bHistory = b.chatHistory.get(currentUser.id);

      if (aHistory && bHistory) {
        const aMostRecent = aHistory[aHistory.length - 1];
        const bMostRecent = bHistory[bHistory.length - 1];

        const aDate = new Date(
          `${aMostRecent.date} ${aMostRecent.time}`
        ).getTime();
        const bDate = new Date(
          `${bMostRecent.date} ${bMostRecent.time}`
        ).getTime();
        return bDate - aDate;
      } else {
        if (aHistory) {
          return -1;
        } else if (bHistory) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  };
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  const handleContactClick = (contact) => {
    setActiveContact(contact);
    setTimeout(() => {
      handleContactChangeView(contact);
    }, 50);
  };

  const handleContactChangeView = (contact) => {
    const currentUserHistory =
      currentUser && currentUser.chatHistory.get(contact.id);
    if (currentUserHistory) {
      //for each message that is not from the current user, set read to true
      currentUserHistory.filter((message) => {
        if (!message.read && message.id === contact.id) {
          message.read = true;
        }
      });
      setTimeout(() => {
        scrollToBottom();
        setCurrentUserHistory(currentUserHistory);
      }, 50);
    } else {
      setCurrentUserHistory(null);
    }
  };
  const handleNewMessage = () => {
    Message.createMessage(
      messageInputValue,
      currentUser.id,
      activeContact.id,
      false
    );
    if (!activeContact.contacts.has(currentUser.id)) {
      activeContact.contacts.set(currentUser.id, currentUser);
    }
    if (!currentUser.contacts.has(activeContact.id)) {
      currentUser.contacts.set(activeContact.id, activeContact);
    }
    // Message.printChatLog(currentUser.id, activeContact.id);
    // update active contact chat history to read
    const activeContactChatHistory =
      activeContact && activeContact.chatHistory.get(currentUser.id);
    if (activeContactChatHistory) {
      //for each message that is not from the current user, set read to true
      activeContactChatHistory.forEach((message) => {
        if (message.id === activeContact.id) {
          message.read = true;
        }
      });
    }

    // Clear the message input
    setMessageInputValue("");
    scrollToBottom();
    //place current contact at the top of the list
    const newContacts = contacts.filter((c) => c !== activeContact);
    newContacts.unshift(activeContact);
    setContacts(newContacts);

    // update active contact container to green
    const activeContactContainer = document.querySelector(
      ".active_contact_container"
    );
    if (activeContactContainer) {
      activeContactContainer.classList.add("active_contact_container--green");

      setTimeout(() => {
        activeContactContainer.classList.remove(
          "active_contact_container--green"
        );
      }, 300);
    }
  };

  const handleInputChange = (event) => {
    setMessageInputValue(event.target.value);

    if (event.key === "Enter") {
      handleNewMessage();
    }
  };

  const handleAddContact = (username) => {
    if (username === "") {
      return -3;
    }

    if (contacts.find((c) => c.name.toLowerCase() === username.toLowerCase())) {
      return -2;
    }

    if (!ContactsList.findContactByIdIgnoreCase(username)) {
      return -1;
    }

    const newContact = ContactsList.findContactByIdIgnoreCase(username);
    const newContacts = [...contacts, newContact];
    !currentUser.contacts.has(newContact.id) &&
      currentUser.contacts.set(newContact.id, newContact);
    setContacts(newContacts);
    sortContacts(newContacts);
  };

  const handleDeleteContact = (contact) => {
    if (activeContact.id === contact.id) {
      setActiveContact(null);
    }
    const newContacts = contacts.filter((c) => c.id !== contact.id);
    setContacts(newContacts);
    currentUser.contacts.delete(contact.id);
  };

  const handleUserLogout = () => {
    handleUserChange(null);
    setContacts([]);
    history("/");
  };

  useEffect(() => {
    const sortedContacts = sortContacts(contacts);
    setContacts(sortedContacts);
  }, [contacts]);

  const handleUpdateActiveContactChanges = () => {
    if (activeContact) {
      const newActiveContact = contacts.find((c) => c.id === activeContact.id);
      setActiveContact(newActiveContact);
    }
  };

  const handleContactsAdding = () => {
    if (!currentUser) return;
    //get contacts of current user
    const userContacts = currentUser.contacts;

    if (!userContacts) return;
    //iterate over userContacts map and add to contacts
    for (const [key, value] of userContacts.entries()) {
      const contact = value;
      if (!contacts.includes(contact)) {
        const newContacts = [...contacts, contact];
        setContacts(newContacts);
      }
    }
    sortContacts(contacts);

    // const userHistory = Message.getChatHistory(currentUser.id);
    // //iterate over userHistory map
    // for (const [key, value] of userHistory.entries()) {
    //   const contact = ContactsList.findContactById(key);
    //   if (!contacts.includes(contact)) {
    //     const newContacts = [...contacts, contact];
    //     setContacts(newContacts);
    //   }
    // }
  };

  handleContactsAdding();

  useEffect(() => {
    handleUpdateActiveContactChanges();
  }, [contacts, activeContact, handleUpdateActiveContactChanges]);

  return (
    <>
      {currentUser ? (
        <>
          <div className="container" id="chat-content">
            {/*row for contact and chat screen*/}
            <div className="row">
              {/*contact screen*/}
              <div className="col-md-4 col-12" id="contact-screen">
                <ContactScreen
                  currentUser={currentUser}
                  displayContacts={displayContacts}
                  activeUser={activeContact}
                  handleContactClick={handleContactClick}
                  handleSearch={handleSearch}
                  handleUserLogout={handleUserLogout}
                />
              </div>

              {/*chat screen*/}
              <div className="col-md-8 col-12" id="chat-screen">
                <ChatScreen
                  currentUser={currentUser}
                  contact={activeContact}
                  contactsListRef={contactsListRef}
                  messageInputValue={messageInputValue}
                  handleInputChange={handleInputChange}
                  handleNewMessage={handleNewMessage}
                />
              </div>
            </div>
          </div>
          {/*Modals */}
          <Modals
            handleAddContact={handleAddContact}
            handleDeleteContact={handleDeleteContact}
            handleUserLogout={handleUserLogout}
            currentUser={currentUser}
            contact={activeContact}
          />
        </>
      ) : (
        <>{/*  re-route to /*/}</>
      )}
    </>
  );
};