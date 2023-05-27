#  Ronen-Chen-Ass2

  

#  Chat Project 💬

Welcome to our chat project!

This project is designed to provide a platform for users to chat and connect with each other in real-time. Our chat application allows users to create a profile, search for other users, and start a conversation with them.

  

Our chat interface is user-friendly and easy to use. You can send text messages, emojis, and even share images and files.

##  Milestone 1 part A 🗿

In this Milestone we created a login and register screen aswell as a chat screen. We have implemented the foundations to add users to our contact list and our user login/register system, giving it a modern look and made it size responsive so it will look good no matter what is your screen size.

  

  

  

####  Lessons Learned

  

In this Milestone we implemented HTML, CSS, and Bootstrap for the first time! Through this experience, We have learned the basics of creating and styling web pages. We now have a solid understanding of HTML tags, CSS selectors, and how to use Bootstrap to create responsive and visually appealing designs.

  

We learned how to structure our HTML code to create a clear and organized page, use CSS to add color, typography, and other styles to my web page, and leverage Bootstrap's components and grid system to create a responsive layout that looks great on any device.

  ##  Milestone 1 part B 🗿
This project implements a chat screen with login and registration functionality for a website. The chat screen allows users to engage  conversations and exchange messages with each other. The login and registration features ensure that only authenticated users can access the chat screen.

### Features

1.  **Chat Screen**: The chat screen provides a user-friendly interface where users can view and participate in conversations. Messages are displayed in chronological order, and users can send text messages to the chat.
    
2.  **Login**: The login feature allows users to authenticate themselves before accessing the chat screen. 
    
3.  **Registration**: The registration feature enables new users to create an account and gain access to the chat screen. 
    
## Register

The Register feature allows new users to create an account and gain access to the chat screen. During registration, users must fill out all required fields, including username, password, password verification, and display name. A username must be unique, and the system checks if a chosen username is already taken. Usernames are case-insensitive. A username can be 3-16 characters long and can contain letters, numbers, "-", and "_".

The password must be at least 8 characters long and contain at least one letter and one number. Special characters like !@#$%^&*()_+ are also allowed. The password verification field ensures that users enter the same password twice.

The display name can contain spaces, numbers, letters, "-", and "_". It cannot end with a space and must be between 3-16 characters in length.

If the user enters incorrect information, an ❌ will appear to indicate an error. Conversely, if the user enters the required information correctly, a ✔️ will be displayed to indicate success. The registration button is disabled until all fields are filled out as required.

Users have the option to upload a profile picture during registration. If no picture is uploaded, a default profile picture will be assigned. Once registration is complete, the user will be redirected to the login screen.

  ##   Login

The Login feature allows users to authenticate themselves and access the chat screen. Users can log in using the same username they registered with, regardless of uppercase or lowercase letters.

During login, the following scenarios can occur:

1.  **Invalid Username**: If the entered username does not exist in the system, an error message will appear, indicating that the username is invalid.
    
2.  **Incorrect Password**: If the entered username exists but the password is incorrect, an error message will appear, indicating that the password is incorrect.
    
3.  **Successful Login**: If the entered username and password match the stored credentials, the user will be successfully logged in. After logging in, the screen will transition to the chat screen, where the user can engage in conversations with other participants.
    

It's important to note that the login process is case-insensitive for usernames, meaning that "Username" and "username" would be treated as the same.

## Chat Screen

The Chat Screen allows users to engage in conversations with their contacts. Here are the key features of the Chat Screen:

1.  **Adding Contacts**: Users can add existing contacts who have registered through the registration screen and are stored in the database. Once added, conversations with contacts are saved and can be accessed later.
    
2.  **Deleting Contacts**: Users have the option to delete contacts from their list. However, if contacts are added again, the previous conversations with them will be retained.
    
3.  **Viewing Profiles**: Users can view the profiles of their contacts, which may include information such as the display name, profile picture, and any additional details the user has provided.
    
4.  **Persistent Conversations**: Conversations and contacts are saved even if the user disconnects from the chat. When the user logs back in, they will find their conversations and contacts as they were before.
    
5.  **Multilingual and Emoji Support**: Users can send messages and they can use a combination of emojis to enhance their conversations.🍔🗽
    
6.  **Login Status Indicator**: The user's login status is displayed alongside their profile picture. 
    

By incorporating these features, the Chat Screen provides a seamless and interactive environment for users to communicate with their contacts, preserving conversations, and maintaining a personalized experience.

##  Authors

  

- [@Ronen Sivak](https://github.com/RonenSiv)

- [@Chen Shein](https://github.com/chenshein)
