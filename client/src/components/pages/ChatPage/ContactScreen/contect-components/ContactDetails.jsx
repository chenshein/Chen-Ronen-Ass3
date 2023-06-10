import "./ContactDetails.css";
import { AvatarImage } from "../../AvatarImage";

export const ContactDetails = ({
  currentUser,
  classList = "",
  name,
  image,
  last_massage,
  message_time,
  active,
  unread,
  received,
  from,
  to,
  onClick,
}) => {
  return (
    <>
      <div className={`fluid contact-info-container ${classList}`}>
        <div className="row contact-info-content" onClick={onClick}>
          <div className="col-2 contact-profile-avatar">
            <AvatarImage src={image} width="50px" height="50px" alt="avatar" />
            {active ? <div className="contact-profile-active"></div> : null}
          </div>
          <div className="col-7 contact-profile-detail">
            <div className="row">
              <div className="col-12 contact-info-name ms-3 ms-sm-0 ms-md-4 ms-lg-3">
                <h3>{name}</h3>
              </div>
              {last_massage && (
                <div className="col-12 d-inline contact-info-message ms-3 ms-sm-0 ms-md-4 ms-lg-3">
                  <p>{last_massage}</p>
                  <span>
                    {last_massage && from === currentUser.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="double-check"
                        width="16"
                        height="16"
                        className={`ms-1 ${received ? "received" : ""}`}
                        fill={
                          received
                            ? "var(--read-message-color)"
                            : "var(--unread-message-color)"
                        }
                      >
                        <path d="M22.7071 7.70709C23.0976 7.31656 23.0976 6.68339 22.7071 6.29288C22.3166 5.90236 21.6834 5.90238 21.2929 6.29291L12.0003 15.5859L11.207 14.7928C10.8164 14.4023 10.1833 14.4024 9.79279 14.793C9.40232 15.1836 9.40242 15.8167 9.793 16.2072L11.2934 17.7072C11.684 18.0976 12.3171 18.0976 12.7076 17.7071L22.7071 7.70709ZM16.7071 7.70711C17.0976 7.31658 17.0976 6.68342 16.7071 6.29289C16.3166 5.90237 15.6834 5.90237 15.2929 6.29289L6 15.5858L2.70711 12.2929C2.31658 11.9024 1.68342 11.9024 1.29289 12.2929C0.902369 12.6834 0.902369 13.3166 1.29289 13.7071L5.29289 17.7071C5.48043 17.8946 5.73478 18 6 18C6.26522 18 6.51957 17.8946 6.70711 17.7071L16.7071 7.70711Z"></path>
                      </svg>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="col-3 contact-info-time">
            <div className="row">
              <div className="col-md-12">
                <p
                  style={{
                    textAlign: "right",
                  }}
                >
                  {message_time}
                </p>

                {unread > 0 && (
                  <div className="contactProfile__unread justify-content-center">
                    {unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
