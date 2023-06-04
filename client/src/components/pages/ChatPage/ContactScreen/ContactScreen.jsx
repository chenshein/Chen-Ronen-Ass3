import { UserDetails } from "./user-components/UserDetails";
import { Search } from "./Search";
import { ContactDetails } from "./contect-components/ContactDetails";

export const ContactScreen = ({
  currentUser,
  displayContacts,
  activeUser,
  handleContactClick,
  handleSearch,
  handleUserLogout,
}) => {
  const checkIfMoreThan24Hours = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return date < yesterday;
  };
  return (
    <>
      {/*User Info*/}
      <div className="row justify-content-start align-items-center ">
        <UserDetails
          currentUser={currentUser}
          handleUserLogout={handleUserLogout}
        />
      </div>
      {/*Search*/}
      <div className="row justify-content-start align-items-center">
        <Search handleSearch={handleSearch} />
      </div>

      {/*Contacts*/}
      {displayContacts().length > 0 && (
        <div className="row position-relative contacts-container">
          {displayContacts().map((user) => {
            const lastMessageRead =
              user.chatHistory.get(currentUser.id) &&
              user.chatHistory.get(currentUser.id)[
                user.chatHistory.get(currentUser.id).length - 1
              ].read &&
              user.chatHistory.get(currentUser.id)[
                user.chatHistory.get(currentUser.id).length - 1
              ].id === currentUser.id;

            return (
              <ContactDetails
                currentUser={currentUser}
                classList={
                  activeUser === user
                    ? user.active
                      ? "active_contact_container active"
                      : "active_contact_container"
                    : ""
                }
                name={user.name}
                image={user.image}
                last_massage={
                  user.chatHistory.get(currentUser.id) &&
                  user.chatHistory.get(currentUser.id)[
                    user.chatHistory.get(currentUser.id).length - 1
                  ].message
                }
                message_time={
                  user.chatHistory.get(currentUser.id) &&
                  (checkIfMoreThan24Hours(
                    new Date(
                      user.chatHistory.get(currentUser.id)[
                        user.chatHistory.get(currentUser.id).length - 1
                      ].date
                    )
                  )
                    ? user.chatHistory.get(currentUser.id)[
                        user.chatHistory.get(currentUser.id).length - 1
                      ].date
                    : user.chatHistory.get(currentUser.id)[
                        user.chatHistory.get(currentUser.id).length - 1
                      ].time)
                }
                key={user.id}
                active={user.active}
                unread={
                  user.chatHistory.get(currentUser.id) &&
                  user.chatHistory
                    .get(currentUser.id)
                    .filter(
                      (message) =>
                        message.read === false &&
                        message.targetId === currentUser.id
                    ).length
                }
                received={lastMessageRead}
                status={user.status}
                from={
                  user.chatHistory.get(currentUser.id) &&
                  user.chatHistory.get(currentUser.id)[
                    user.chatHistory.get(currentUser.id).length - 1
                  ].id
                }
                to={
                  user.chatHistory.get(currentUser.id) &&
                  user.chatHistory.get(currentUser.id)[
                    user.chatHistory.get(currentUser.id).length - 1
                  ].targetId
                }
                onClick={() => {
                  handleContactClick(user);
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
