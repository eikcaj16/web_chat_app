# final-project-dream
Dream Team

###
Members:
Yiqing Huang 001525629 001525629 eikcaj16 
Xinlei Bian 002197091 Bian.xin@northeastern.edu nacrow 
Xi Zhao 001054333 zhao.xi3@northeastern.edu xizhao1019 
Haojie Zhang 001029757 zhang.haoj@northeastern.edu Jeffreyzhang24 

###
The project description:
As we are in the age of information explosion, information and messages have 	never been easier to access than it is today. 
Communications between people are becoming more instant, direct and effortless. Over the past few years, 		
messaging apps have become the primary pattern of communication for millions 	of people around the world. Thus, we are dedicated to designing and developing 	an entirely new messaging app to make the information transfer more thoroughly, 	efficiently and restfully. 

Our Dream Messaging app is primarily designed for private communication between individuals or small groups. 
It does not only have the basic function that 	can transmit or receive data types of Short Message Service(SMS) and Multimedia Messaging Service (MMS), but also can send and receive images,   video and files. 


###
domain model:
![cf3d9bb034dd843d51d41418aafd5f8](https://user-images.githubusercontent.com/98080273/160727944-21c4eb9c-b345-4e28-908b-f32c39224d10.jpg)


###
user stories:
[Frontend] As a user, the root page I visit is `login` page. 

[Backend] As a user, I can create an account by filling in a form containing a unique username, a nickname, and a password. 

[Frontend] As a user, in `login` page, I can click a `sign_up` button that link to the `sign_up` page. 

[Frontend] As a user, I can fill in the required information in `sign_up` page. 

[Frontend] As a user, in `sign_up` page, if any of the required fields has not been filled in, I can not click the `ok` button to create an account. 

[Frontend] As a user, in `sign_up` page, if the username has been occupied, I will be noticed to change a username. 

[Frontend] As a user, in `sign_up` page, if I have successfully created an account, I will be redirected to `login` page. 

[Frontend] As a user, in `sign_up` page, I can click `cancel` button to cancel signing up, and then I will be redirected to `login` page. 

[Backend] As a user, I can log into my account with my username and password. 

[Frontend] As a user, in `login` page, I can input a username and password. 

[Frontend] As a user, in `login` page, if I have not input either a username or a password, I cannot click `login` button. 

[Frontend] As a user, in `login` page, if I have inputted a wrong username or password, I will be noticed that something goes wrong. 

[Frontend] As a user, in `login` page, if I have successfully logined, I will be redirected to `personal_page`. 

[Frontend] As a user, in `personal_page` page, I can see `chats`, `contacts`, and `settings` panel/tab. 

[Backend] As a user, I can change my nickname and password. 

[Frontend] As a user, in `personal_page` page, when I click `settings` panel/tab, I can view my information except the password. 

[Frontend] As a user, in `settings` panel/tab, I can edit my nickname and input a new password. 

[Frontend] As a user, in `settings` panel/tab, only if one of the nickname field or the password field has been inputted/updated, I can click `save` button. 

[Frontend] As a user, in `settings` panel/tab, after I clicked `save` button, I will be noticed that whether my update is successful or not. 

[Frontend] As a user, in `settings` panel/tab, I can click `reset` button to clear the password field and reset the nickname to the current one. 

[Backend] As a user, I can delete my account. 

[Frontend] As a user, in `settings` panel/tab, I can click `delete my account` button to delete my account; if the account has been deleted, I will be redirected to `login` page. 

[Backend] As a user, I can logout my account. 

[Frontend] As a user, in `settings` panel/tab, I can click `logout` button to logout my account; if the account has been logout, I will be redirected to `login` page. 

[Backend] As a user, I can see a list of my friends. 

[Frontend] As a user, in `personal_page` page, when I click `contacts` panel/tab, I can view all my friends. 

[Frontend] As a user, in `contacts` panel/tab, when I click `delete` button of any of my friends, we will dismiss our relationship. 

[Backend] As a user, I can add a friend by inputting their username. 

[Frontend] As a user, in `contacts` panel/tab, I can fill in a username in `add_friend_input` field. 

[Frontend] As a user, in `contacts` panel/tab, if `add_friend_input` is not empty, I can click `add_friend` butten to add a friend. 

[Frontend] As a user, in `contacts` panel/tab, after I clicked `add_friend` button, I will be noticed whether I have successfully added the friend or not. 

[Backend] As a user, when I am added by another user, they will be listed in my contact list. 

[Backend] As a user, I can delete any of my friends. 

[Backend] As a user, I can start a conversation with any of my friends. 

[Frontend] As a user, in `personal_page` page, when I click `chats` panel/tab, I can view all my ongoing conversations. 

[Frontend] As a user, in `chats` panel/tab, I can click `new_chat` button to trigger a `select_contact` panel; I can select exactly one of my friends to start a new conversation; the new conversation will be shown in my ongoing conversation list. 

[Frontend] As a user, if I am added to a conversation by another user, my ongoing conversation list will be updated. 

[Backend] As a user, I can start a group chat/conversation with my friends even if they are not friends. 

[Frontend] As a user, in `chats` panel/tab, I can click `new_chat` button to trigger a `select_contact` panel; I can select more than one of my friends to start a new group chat. 

[Backend] As a user, I can send text messages in a conversation. 

[Frontend] As a user, in `chats` panel/tab, when I click one of my ongoing conversations, I can see a `chatbox` panel. 

[Frontend] As a user, in `chatbox` panel, I can input a text message in `text_input` field; I can click `send` button to send the message; the sent message will be shown as a `message_unit` on the right side. 

[Backend] As a user, I can receive text messages in a conversation. 

[Frontend] As a user, in `chatbox` panel, when I received a text message, it will be shown as a `message_unit` on the left side. 

[Backend] As a user, I can send an image/video/file in a conversation. 

[Frontend] As a user, when I have received an image/video, I can view the image/video directly on the webpage. 

[Frontend] As a user, when I have received a file other than an image/video, I can download it. 

[Backend] As a user, I can end up with a one-to-one conversation even if the conversation is started by the other user. 

[Frontend] As a user, in `chatbox` panel, when I click `end_conversation` button, the conversation will be terminated; the `chatbox` panel will be closed; the ongoing conversation list will be updated. 

[Frontend] As a user, if one of my ongoing conversations has been terminated by another user, my ongoing conversation will be updated as well. 

[Backend] As a user, when I end up with a one-to-one conversation, the chat history will be saved. 

[Backend] As a user, when I end up with a group chat, the chat history will be deleted. 

[Backend] As a user, I can only end up with a group chat that was created by myself. 

[Frontend] As a user, if I am not the one who created the group chat, the `end_conversation` button should be disabled. 

[Backend/Frontend] As a user, if I start a conversation with a friend with chat history, the chat history will be firstly extracted to the chatbox. 




