import { AvatarImage } from "../../AvatarImage";

export const ChatBubbleUser = ({ userImg, message, time, active, read }) => {
  function isRTL(s) {
    // eslint-disable-next-line no-control-regex
    const firstNonAsciiCharIndex = s.message.search(/[^\x00-\x7F]/);
    return firstNonAsciiCharIndex !== -1;
  }

  return (
    <>
      <div className="d-flex w-100 justify-content-start align-items-end">
        <div className="bubble_avatar left mb-2">
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
        <div
          className="bubble left d-inline-block"
          style={
            isRTL({ message }) ? { direction: "rtl" } : { direction: "ltr" }
          }
        >
          {message}
          <p className="mt-1">
            <span className="contact-time contact-time--in-text">
              {time}
              <span className="message-recived">
                <svg
                  className="message-recived-icon-chat message-recived-icon-chat--read"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill={read ? "var(--sky-color)" : "currentColor"}
                  viewBox="0 0 16 16"
                >
                  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                </svg>
              </span>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
