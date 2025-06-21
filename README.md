# Roadmap App

#### Live Deployment Link

[https://Roadmap-bari-6a.netlify.app/](https://Roadmap-bari-6a.netlify.app/)

## 🔧 Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt

---

## 🧠 My Thought Process

### Feature Design

I started by understanding the key features from the user stories. Since roadmap items are read-only, I focused on building user interaction features like upvoting, commenting, and replying. I made sure users could only upvote once per item by tracking user IDs. For comments and replies, I enforced a 300-character limit for clarity and limited reply nesting to 3 levels to avoid clutter. I also added sorting and filtering for better roadmap navigation.

### Architecture Decisions

I chose the MERN stack because I'm comfortable working full-stack in JavaScript. Using **MongoDB** made it easy to store users, comments, upvotes, and replies with flexible schemas. On the frontend, I used **React** with **Redux Toolkit** to manage global states like authentication and user actions. For backend, I kept things clean with Express routes and followed MVC to separate logic.

### Code Style

I followed a modular folder structure to keep things organized — separating components, pages, Redux slices, and backend controllers. My goal was to write clean, readable code that's easy to maintain or extend later.
