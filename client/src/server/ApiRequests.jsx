import { Contacts } from "../dataStructure/contact/contact";

const ApiRequests = async (currentUser = null) => {
  const apiToken = async () => {
    try {
      const data = {
        username: currentUser.id,
        password: currentUser.password,
      };
      const response = await fetch("http://localhost:5000/api/Tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        await localStorage.removeItem("token");
        localStorage.setItem("token", data);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const apiGetChats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/Chats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("data", data);
        return data;
      } else {
        if (!(await apiToken())) return null;
        else await apiGetChats();
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const apiGetChatID = async (username) => {
    if (!username) return null;
    try {
      const get = await apiGetChats();
      if (!get) return null;
      for (const item of get) {
        if (item.user && item.user.username === username) {
          return item.id;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const apiGetChatWithUser = async (username) => {
    if (!username) return null;
    const id = await apiGetChatID(username);
    // console.log(id);
    if (id) {
      try {
        const messages = await fetch(
          `http://localhost:5000/api/Chats/${id}/Messages`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (messages.ok) {
          return await messages.json();
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return null;
    }
  };

  const apiPostChat = async (username) => {
    // console.log(username);
    if (!username) return null;
    const exists = await apiGetChatID(username);
    if (!exists) {
      const data = {
        username: username,
      };
      try {
        // console.log(data);
        const response = await fetch("http://localhost:5000/api/Chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          return await response.json();
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return null;
    }
  };

  const apiPostChatID = async (newMessage) => {
    if (!newMessage) return null;
    let id = await apiGetChatID(newMessage.targetId);
    if (!id) {
      id = await apiPostChat(newMessage.targetId);
    }
    const data = {
      msg: newMessage.message,
    };
    try {
      // console.log(data);
      const response = await fetch(
        `http://localhost:5000/api/Chats/${id}/Messages`,
        {
          method: "POST",
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const apiDeleteChat = async (username) => {
    if (!username) return null;
    const id = await apiGetChatID(username);
    try {
      if (id) {
        const response = await fetch(`http://localhost:5000/api/Chats/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          return await response.json();
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const apiGetUser = async (username) => {
    if (!username) return null;
    try {
      const response = await fetch(
        `http://localhost:5000/api/Users/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const apiGetUserChatsAsContacts = async () => {
    const chats = await apiGetChats();
    const contacts = [];
    if (!chats) return null;
    for (const chat of chats) {
      const revertImage = `${chat.user.profilePic}`;
      const user = new Contacts(
        chat.user.username,
        chat.user.displayName,
        null,
        revertImage
      );
      contacts.push(user);
    }
    return [...new Set(contacts)];
  };

  const apiNewMessage = async (newMessage) => {
    if (!newMessage) return null;
    return await apiPostChatID(newMessage);
  };

  const apiGetLastMessage = async (username) => {
    if (!username) return null;
    try {
      const id = await apiGetChatID(username);
      if (id) {
        const response = await fetch(
          `http://localhost:5000/api/Chats/${id}/Messages`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          return data[0];
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      // console.log(error);
      return null;
    }
  };

  return {
    apiGetChats,
    apiGetChatID,
    apiGetChatWithUser,
    apiPostChat,
    apiPostChatID,
    apiDeleteChat,
    apiGetUser,
    apiGetUserChatsAsContacts,
    apiNewMessage,
    apiGetLastMessage,
  };
};
export default ApiRequests;
