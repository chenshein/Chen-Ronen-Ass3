import { ContactScreen } from "./ContactScreen/ContactScreen";
import "./style/index.css";
import { ChatScreen } from "./ChatScreen/ChatScreen";
import { useEffect, useState } from "react";
import { Modals } from "./Modals";
import { Message } from "../../../dataStructure/message/chatMessage";
import { useNavigate } from "react-router-dom";
import { ContactsList } from "../../../dataStructure/contact/contactList";
import ApiRequests from "../../../server/ApiRequests";
import io from "socket.io-client";

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
  const [socket, setSocket] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const s = io("http://localhost:5000/");
    setSocket(s);
    return () => s.disconnect();
  }, []);

  const getMessage = async () => {
    try {
      if (!activeContact) return;
      const api = await ApiRequests();
      const response = await api.apiGetChatWithUser(activeContact.id);
      if (!response) return;
      await response.reverse();
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getContacts = async () => {
    const api = await ApiRequests();
    const response = await api.apiGetChats();
    if (!response) return;
    // console.log(response);
    return response;
  };

  const [chatHistory, setChatHistory] = useState([]);
  useEffect(() => {
    getMessage().then((res) => setChatHistory(res));
  }, [activeContact, getMessage]);

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
      if (!chatScreenBottom) return;
      chatScreenBottom.scrollTop = chatScreenBottom.scrollHeight;
    }, 50);
  };

  useEffect(() => {
    const waitForSocket = async () => {
      if (socket && !isLoggedIn) {
        setLoggedIn(true);
        currentUser && socket.emit("login",{
          userName: currentUser.id,
          isOnline : isLoggedIn}
        );
      }
    };

    const handleMessageReceived = async (message) => {
      // console.log("test", contacts);
      const contact = contacts.find(
        (c) =>
          c && message && message.sender && c.id === message.sender.username
      );
      if (!contact) {
        const apiRequests = await ApiRequests();
        const newContacts = await apiRequests.apiGetUserChatsAsContacts();
        await setContacts(newContacts);
      } else {
        // console.log("contacts", contacts);
        // set the current contact to top of the list
        const newContacts = contacts.filter((c) => c.id !== contact.id);
        newContacts.unshift(contact);
        await setContacts(newContacts);
        // get the first fluid contact-info-container
        setTimeout(() => {
          const firstContactInfoContainer = document.querySelector(
            ".contact-info-container"
          );
          if (firstContactInfoContainer) {
            firstContactInfoContainer.classList.add(
              "contact-info-container--green"
            );
            setTimeout(() => {
              firstContactInfoContainer.classList.remove(
                "contact-info-container--green"
              );
            }, 300);
          }
        }, 100);
      }
      console.log(
        "sepcs",
        message.sender.username,
        currentUser,
        currentUser.username
      );
      // await setChatHistory([await getMessage(), message]);
      scrollToBottom();
    };

    socket && socket.on("receive_message", handleMessageReceived);

    waitForSocket();

    // Clean up the event listener when the component unmounts
    return () => {
      socket && socket.off("receive_message", handleMessageReceived);
    };
  });

  // re-render when chatHistory changes
  useEffect(() => {}, [chatHistory]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sortContacts = (newContacts) => {
    // console.log("sortContacts");
    return newContacts.sort(async (a, b) => {
      const apiRequests = await ApiRequests();
      const aHistory = apiRequests.apiGetLastMessage(a.id);
      const bHistory = apiRequests.apiGetLastMessage(b.id);

      if (aHistory && bHistory) {
        const aMostRecent = aHistory.created;
        const bMostRecent = bHistory.created;

        const aDate = new Date(aMostRecent).getTime();
        const bDate = new Date(bMostRecent).getTime();
        return aDate - bDate;
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
  const handleNewMessage = async () => {
    const message = {
      targetId: activeContact.id,
      message: messageInputValue,
    };
    // console.log(message);
    const apiRequest = await ApiRequests();
    const response = await apiRequest.apiNewMessage(message);
    // console.log(response);
    // console.log(response);
    // if (!activeContact.contacts.has(currentUser.id)) {
    //   activeContact.contacts.set(currentUser.id, currentUser);
    // }
    // if (!currentUser.contacts.has(activeContact.id)) {
    //   currentUser.contacts.set(activeContact.id, activeContact);
    // }
    // Message.printChatLog(currentUser.id, activeContact.id);
    // update active contact chat history to read
    // const activeContactChatHistory =
    //   activeContact && activeContact.chatHistory.get(currentUser.id);
    // if (activeContactChatHistory) {
    //   //for each message that is not from the current user, set read to true
    //   activeContactChatHistory.forEach((message) => {
    //     if (message.id === activeContact.id) {
    //       message.read = true;
    //     }
    //   });
    // }
    const textArea = document.querySelector("#chatInput");
    if (textArea) {
      textArea.value = "";
    }
    const contactName = activeContact.id;
    socket.emit("send_message", { message: response, contactName });
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
    //
    // if (event.key === "Enter") {
    //   handleNewMessage();
    // }
  };

  const handleAddContact = async (username) => {
    let retValue = 0;
    if (username === "") {
      return -3;
    }
    const apiRequest = await ApiRequests();
    await apiRequest.apiGetChatID(username).then((response) => {
      if (response !== null) {
        retValue = -2;
      }
    });

    await apiRequest.apiPostChat(username).then((response) => {
      if (retValue === 0 && response === null) {
        retValue = -1;
      }
    });
    if (retValue !== 0) {
      return retValue;
    }
    const apiRequests = await ApiRequests();
    const newContacts = await apiRequests.apiGetUserChatsAsContacts();
    // console.log(sortContacts(newContacts));
    await setContacts(newContacts);
  };

  // useEffect(() => {
  //   console.log("contacts changed", contacts);
  // }, [contacts]);

  const handleDeleteContact = async (contact) => {
    if (activeContact.id === contact.id) {
      setActiveContact(null);
    }
    const newContacts = contacts.filter((c) => c.id !== contact.id);
    setContacts(newContacts);
    currentUser.contacts.delete(contact.id);
    const apiRequests = await ApiRequests();
    await apiRequests.apiDeleteChat(contact.id);
  };

  const handleUserLogout = () => {
    handleUserChange(null);
    socket.emit("logout", currentUser.id);
    setContacts([]);
    history("/");
  };

  const handleUpdateActiveContactChanges = () => {
    if (activeContact) {
      const newActiveContact = contacts.find((c) => c.id === activeContact.id);
      setActiveContact(newActiveContact);
    }
  };

  const handleContactsAdding = async () => {
    if (!currentUser) return;
    //get contacts of current user
    // console.log("sort");
    if (!contacts) return;
    //iterate over userContacts map and add to contacts
    const apiRequests = await ApiRequests();
    const newContacts = await apiRequests.apiGetUserChatsAsContacts();
    // console.log(newContacts);
  };

  useEffect(() => {
    handleContactsAdding();
  }, []);

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
                  chatHistory={chatHistory}
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
