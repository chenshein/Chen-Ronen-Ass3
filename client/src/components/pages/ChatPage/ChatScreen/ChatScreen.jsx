import { ActiveContact } from "./ActiveContact/ActiveContact";
import { ActiveChatScreen } from "./ActiveContact/ActiveChatScreen";
import { NoContactsChatScreen } from "./ActiveContact/NoContactsChatScreen";

export const ChatScreen = ({
  currentUser,
  contact,
  contactsListRef,
  messageInputValue,
  handleInputChange,
  handleNewMessage,
  chatHistory,
}) => {
  return (
    <>
      {contact ? (
        <>
          {/*Contacts Info*/}

          <ActiveContact contact={contact} />
          <div
            className="parent-element"
            data-bs-parent="#parent-element-group"
          ></div>
          <ActiveChatScreen
            currentUser={currentUser}
            contact={contact}
            messageInputValue={messageInputValue}
            handleInputChange={handleInputChange}
            handleNewMessage={handleNewMessage}
            chatHistory={chatHistory}
          />
        </>
      ) : (
        <div className="row justify-content-start align-items-center position-relative">
          <NoContactsChatScreen />
        </div>
      )}
    </>
  );
};
