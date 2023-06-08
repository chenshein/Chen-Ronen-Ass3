import { Route, Routes, useLocation } from "react-router-dom";
import LoginSignupPage from "./components/pages/LoginSignupPage/LoginSignupPage";
import { ChatPage } from "./components/pages/ChatPage/ChatPage";
import { useEffect, useRef, useState } from "react";
import { ContactsList } from "./dataStructure/contact/contactList";
import ApiRequests from "./server/ApiRequests";

export const PageRoutes = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const contactsListRef = useRef(ContactsList.getList());

  const handleUserChange = async (user) => {
    setCurrentUser(user);
    if (!user) return;
    const apiRequests = await ApiRequests();
    const newContacts = await apiRequests.apiGetUserChatsAsContacts();
    setContacts(newContacts);
  };

  const sortContacts = (newContacts) => {
    return new Promise((resolve, reject) => {
      ApiRequests()
        .then((apiRequests) => {
          const lastMessagePromises = newContacts.map((contact) =>
            apiRequests.apiGetLastMessage(contact.id)
          );

          return Promise.all(lastMessagePromises);
        })
        .then((lastMessages) => {
          const sortedArr = newContacts.sort((a, b) => {
            const aHistory = lastMessages.find((msg) => msg.id === a.id);
            const bHistory = lastMessages.find((msg) => msg.id === b.id);

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

          // console.log("sorted arr", sortedArr);
          resolve(sortedArr);
        })
        .catch((error) => {
          console.error(error);
          resolve(newContacts); // Return original array if there's an error
        });
    });
  };

  useEffect(() => {
    contactsListRef.current = ContactsList.getList();
  }, [ContactsList.getList()]);

  useEffect(() => {
    // get the contacts in contactlistref that are in contacts
    const newContacts = contactsListRef.current.filter((contact) =>
      contacts.find((c) => c.id === contact.id)
    );
    // set contacts to the filtered contacts
    setContacts(newContacts);
  }, []);

  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<LoginSignupPage handleUserChange={handleUserChange} />}
        />
        <Route
          path="/chat"
          element={
            <ChatPage
              currentUser={currentUser}
              contacts={contacts}
              setContacts={setContacts}
              contactsListRef={contactsListRef}
              handleUserChange={handleUserChange}
            />
          }
        />
      </Routes>
    </>
  );
};
