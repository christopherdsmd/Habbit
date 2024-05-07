# Habbit - Daily Habit Tracker 🐸
A Contribution graph for your Daily Habits <br/>
Visit [Habbit Website](https://www.habbit.site)

<p align="center">
  <img src="https://github.com/christopherdsmd/Habbit/assets/104523163/909fe103-a9d9-411f-932c-8a6bffebc4bd" /> 
</p>

## Introduction

Welcome to Habbit! - Inspired by the GitHub contributions graph, comes your own personal contribution bar for building and maintaining healthy habits effortlessly. With Habbit, you can easily track your daily routines, set new goals, and visualize your progress over time. Seamlessly designed for both desktop and mobile use, Habbit offers an easy-to-use interface for storing personal habits and tracking them on calendar for the year! Great for setting and tracking your personal goals. 

## Features
- Real-time Habit Tracking: Easily add and delete habits, and monitor your progress in real-time.
- Calendar View: Visualize your habits over time with an intuitive and dynamic calendar view.
- Daily Frog Emoji: the dashboard displays a new frog emoji art each day, check back daily to see each one! 
- User Authentication: Secure your data with a user authentication login system using secure database practices
- Responsive Interface: Interactive, and responsive interface. Friendly for desktop users and mobile users.
  
  
## Technology Stack 
MERN Stack 
- MongoDB - Database
- Express - Backend, APIs
- React JS - Frontend
- Node JS - Backend

## How it works

Habbit is a full-stack application consisting of two ends and a database. The frontend was developed in React JavaScript, providing a clean interface that interacts with the database using React hooks to dynamically update the application without needing to refresh. The frontend makes API requests to the backend, where login is handled. The backend was written in Node.js and handles server-side logic, including routing, database calls, and server optimization and configuration. Data is stored and fetched in a MongoDB database.

## Frontend/User-Interface
The website frontend display for users was programmed in HTML, CSS, and Javascript React. The intention was to make the dashboard a seamless and intuitive user experience. React state hooks were used to provide a dynamically updating website, eliminating the need for cumbersome page refreshes, and reading data from the backend server API. Includes responsive design so that the website works on all devices in varying screen sizes (Desktop Computers, Laptops, Phones, Tablets etc.)

<p align="center">Mobile View</br> 
  <img src="https://github.com/christopherdsmd/Habbit/assets/104523163/91efe531-4657-402d-9e4d-2f1f839d9df2" /> 
</p>

## Backend
Utilizing Node.JS for server-side routing, the backend server transfers data between the database and frontend UI. CORS is configured to allow requests from specific origins and the middleware system has a function 'authenticateToken' which verifies the server JWT tokens sent in the request headers for sending and receiving user and habit data.
 

User authentication system using bcrypt encryption to ensure user data and passwords are protected. 
![image](https://github.com/christopherdsmd/Habbit/assets/104523163/f6380f29-fa37-4141-8a25-d42c40740e42)


## Database
MongoDB was chosen for its simple use and NoSQL design, My use case for the database is pretty simple so this system worked perfectly.
<p align="center">
  Database schema for the user and the subschema for the individual habits inhabited by the user account. </br> 
  <img src="https://github.com/christopherdsmd/Habbit/assets/104523163/e18b1e31-d87f-4b2f-b86e-1da3addc1d36" /> 
</p>

<p align="center">
   A database administrator can view and manipulate, user and habit data in separate clusters </br> 
  <img src="https://github.com/christopherdsmd/Habbit/assets/104523163/2cd6ce4a-a74e-49fc-a769-50babaa568c9" /> 
</p>

## Hosting
The server is being hosted online at www.habbit.site, this custom domain was purchased via godaddy.com. Both my instance the website and server are hosted at render.com, The database is hosted through MongoDB 
![image](https://github.com/christopherdsmd/Habbit/assets/104523163/d6bb7a98-861a-4741-894d-3e9b88bd395f)


</br>

Start tracking your habits now!
www.habbit.site
