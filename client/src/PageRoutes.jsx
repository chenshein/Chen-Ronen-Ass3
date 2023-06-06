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
    console.log("check the user ", user);
    const apiRequests = await ApiRequests(user);
    const newContacts = await apiRequests.apiGetUserChatsAsContacts();
    setContacts(newContacts);
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
