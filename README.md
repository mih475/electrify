# electrify
A basic e-commerce website

1. After going into electrify folder run "nodemon" inside terminal
2. Inside electrify folder, go inside "client" folder and run "ng serve"
3. Open windows console and run "mongod" in one terminal and "mongo" in another terminal
4. There is no database attached to the submission folder. The screenshots are the proofs for this project.
   Register feature will create a user/purchaser of Electrify website.
   To make a user an admin, I used Robo 3T 1.4.2 to get into the database and change the role value to 1. 
   User/purchaser's default value is 0. Turning it into 1 will make that user an admin.
5. server.js connects to database. In my case I created a database callsed "Users" and under collection, I have all the users.

Some dependencies need to be installed/updated for both frontend and backend. They are - 
1.	cors
2.	bcryptjs
3.	body-parser
4.	express
5.	jsonwebtoken
6.	moment
7.	mongoose
8.	multer
9.	validator
10.	bootstrap
11.	jquery
12.	popper.js
13.	jspdf
14.	font-awesome
15.	angular-font-awesome
