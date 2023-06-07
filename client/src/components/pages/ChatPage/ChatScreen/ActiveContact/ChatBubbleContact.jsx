import "./bubble.css";
import { AvatarImage } from "../../AvatarImage";

export const ChatBubbleContact = ({ userImg, message, time, active }) => {
  function isRTL(s){
    // eslint-disable-next-line no-control-regex
    const firstNonAsciiCharIndex = s.message.search(/[^\x00-\x7F]/);
    return firstNonAsciiCharIndex !== -1;
  }
  return (
    <>
      {message && (
        <div className="d-flex w-100 justify-content-end align-items-end">
          <div className="bubble right d-inline"  style={isRTL({message}) ? {direction: "rtl"} : {direction: "ltr"}}>
            {message}
            <p className="mt-1">
              <span className="contact-time contact-time--in-text">{time}</span>
            </p>
          </div>
          <div className="bubble_avatar right mb-2"

          >
            <AvatarImage
              src={userImg}
              width="40px"
              height="40px"
              alt="user avatar"
              style={{
                borderColor: active
                  ? "var(--green-color)"
                  : "var(--user-chat-bubble-color)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
