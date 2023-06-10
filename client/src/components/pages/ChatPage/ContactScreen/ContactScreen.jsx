import { UserDetails } from "./user-components/UserDetails";
import { Search } from "./Search";
import { ContactDetails } from "./contect-components/ContactDetails";
import ApiRequests from "../../../../server/ApiRequests";
import { useEffect, useMemo, useState } from "react";

export const ContactScreen = ({
  currentUser,
  displayContacts,
  activeUser,
  handleContactClick,
  handleSearch,
  handleUserLogout,
}) => {
  const [lastMessages, setLastMessages] = useState({});
  const [changeFlag, setChangeFlag] = useState(false);
  useEffect(() => {
    if (changeFlag) {
      setChangeFlag(false);
      return;
    }
    const getData = async () => {
      const api = await ApiRequests();
      const newMap = new Map();
      for (const contact of displayContacts()) {
        const response = await api.apiGetLastMessage(contact.id);
        const data = JSON.stringify(response);
        await newMap.set(contact.id, data ? data : "");
      }
      setLastMessages(newMap);
      setChangeFlag(true);
    };

    getData();
  }, [displayContacts]);

  const sortContacts = useMemo(() => {
    setChangeFlag(false);
    try {
      return displayContacts().sort((a, b) => {
        const dataParsedA =
          lastMessages && lastMessages.get(a.id)
            ? JSON.parse(lastMessages.get(a.id))
            : "";
        const dataParsedB =
          lastMessages && lastMessages.get(b.id)
            ? JSON.parse(lastMessages.get(b.id))
            : "";

        const aDate = new Date(dataParsedA && dataParsedA.created);
        const bDate = new Date(dataParsedB && dataParsedB.created);

        return bDate - aDate;
      });
    } catch (e) {
      console.log(e);
    }
  }, [lastMessages, displayContacts]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const api = await ApiRequests();
  //     const newMap = new Map();
  //     for (const contact of displayContacts()) {
  //       const response = await api.apiGetLastMessage(contact.id);
  //       const data = JSON.stringify(response);
  //       await newMap.set(contact.id, data ? data : "");
  //     }
  //     setLastMessages(newMap);
  //   };
  //
  //   const sortContacts = () => {
  //     return displayContacts().sort((a, b) => {
  //       const dataParsedA =
  //         lastMessages && lastMessages.get(a.id)
  //           ? JSON.parse(lastMessages.get(a.id))
  //           : "";
  //       const dataParsedB =
  //         lastMessages && lastMessages.get(b.id)
  //           ? JSON.parse(lastMessages.get(b.id))
  //           : "";
  //
  //       const aDate = new Date(dataParsedA.created);
  //       const bDate = new Date(dataParsedB.created);
  //
  //       console.log(bDate, aDate);
  //       return bDate - aDate;
  //     });
  //   };
  //   getData();
  //   console.log(sortContacts());
  // }, [displayContacts]);
  const checkIfMoreThan24Hours = (date) => {
    const today = new Date();
    const inputDate = new Date(date);
    const inputDateDD = inputDate.getDate(); // Get the "DD" part of the input date

    const todayDD = today.getDate(); // Get the "DD" part of today's date
    return inputDateDD < todayDD;
  };

  const handleLastMessageContent = (contact) => {
    try {
      const dataParsed =
        lastMessages && lastMessages.get(contact.id)
          ? JSON.parse(lastMessages.get(contact.id))
          : "";
      if (dataParsed) {
        return dataParsed.content;
      }
      return "";
    } catch (e) {
      console.log(e);
    }
  };

  const handleLastMessageDate = (contact) => {
    try {
      const dataParsed =
        lastMessages && lastMessages.get(contact.id)
          ? JSON.parse(lastMessages.get(contact.id))
          : "";
      if (dataParsed) {
        const date = new Date(dataParsed.created);
        const today = !checkIfMoreThan24Hours(date);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const formattedTime = today
          ? `${hours}:${minutes}`
          : `${day}/${month}/${year} ${hours}:${minutes}`;

        return formattedTime;
      }
      return "";
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  if (!lastMessages) return <div>Loading...</div>;

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
            if (!user || !user.chatHistory) return null;
            const lastMessageRead =
              user &&
              user.chatHistory &&
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
                  // user.chatHistory.get(currentUser.id) &&
                  // user.chatHistory.get(currentUser.id)[
                  //   user.chatHistory.get(currentUser.id).length - 1
                  // ].message
                  handleLastMessageContent(user)
                }
                message_time={handleLastMessageDate(user)}
                key={user.id}
                active={user.active}
                unread={
                  user &&
                  user.chatHistory &&
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
                  user &&
                  user.chatHistory &&
                  user.chatHistory.get(currentUser.id) &&
                  user.chatHistory.get(currentUser.id)[
                    user.chatHistory.get(currentUser.id).length - 1
                  ].id
                }
                to={
                  user &&
                  user.chatHistory &&
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
