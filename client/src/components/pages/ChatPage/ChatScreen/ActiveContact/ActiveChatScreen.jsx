import "./activechatscreen.css";
import { ChatBar } from "../ChatBar";
import { ChatBubbleUser } from "./ChatBubbleUser";
import { ChatBubbleContact } from "./ChatBubbleContact";
import { AvatarImage } from "../../AvatarImage";
import EmojiPicker from "../../EmojiPicker";
import ApiRequests from "../../../../../server/ApiRequests";
import { useEffect, useState } from "react";

const checkIfMoreThan24Hours = (date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return date < yesterday;
};
export const ActiveChatScreen = ({
  currentUser,
  contact,
  messageInputValue,
  handleInputChange,
  handleNewMessage,
}) => {
  const getMessage = async () => {
    const api = await ApiRequests();
    const response = await api.apiGetChatWithUser(contact.id);
    await response.reverse();
    return response;
  };
  const [chatHistory, setChatHistory] = useState([]);
  useEffect(() => {
    getMessage().then((res) => setChatHistory(res));
  }, [contact]);
  const addEmoji = (emoji) => {
    messageInputValue += emoji;
    handleInputChange({ target: { value: messageInputValue } });
  };

  return (
    <>
      <div className="active_chatScreen position-relative active_chatScreen_container">
        {/*change from get(1) to get userId when done*/}
        {chatHistory.length > 0 ? (
          chatHistory.map((message, index) =>
            message.sender.username === currentUser.id ? (
              // (console.log(message.content, index),
              <ChatBubbleUser
                userImg={currentUser.image}
                message={message.content}
                time={
                  checkIfMoreThan24Hours(new Date(message.date))
                    ? chatHistory.created
                    : chatHistory.created
                }
                active={currentUser.active}
                read={message.read}
                key={index}
              />
            ) : (
              <ChatBubbleContact
                userImg={contact.image}
                message={message.content}
                time={
                  checkIfMoreThan24Hours(new Date(message.date))
                    ? chatHistory.created
                    : chatHistory.created
                }
                active={contact.active}
                read={message.read}
                key={index}
              />
            )
          )
        ) : (
          <>
            <div className="row h-100 d-flex justify-content-center align-items-center active_chatScreen__newchat">
              <div className="col-3 d-flex justify-content-center align-items-center">
                <AvatarImage
                  src={currentUser.image}
                  width="70px"
                  height="70px"
                  style={
                    currentUser.active
                      ? { border: "2px solid var(--green-color)" }
                      : { border: "2px solid var(--orange-color)" }
                  }
                />
              </div>
              <div className="col speech top d-inline-block align-items-center text-center">
                <p>
                  Start Chatting With {contact.name} By Typing A Message Below
                </p>
              </div>
              <div className="col-3 d-flex justify-content-center align-items-center">
                <AvatarImage
                  src={contact.image}
                  width="70px"
                  height="70px"
                  style={
                    contact.active
                      ? { border: "2px solid var(--green-color)" }
                      : { border: "2px solid var(--orange-color)" }
                  }
                />
              </div>
            </div>
          </>
        )}
        <div id="chatScreenBottom" />
      </div>
      <div className="active_user_input_container">
        <div className="row active_chatScreen__emoji">
          <EmojiPicker addEmoji={addEmoji} />
        </div>
        <ChatBar
          messageInputValue={messageInputValue}
          handleInputChange={handleInputChange}
          handleNewMessage={handleNewMessage}
        />
      </div>
    </>
  );
};
