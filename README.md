# <img src="https://github.com/user-attachments/assets/7f0577a0-9712-4f2e-aea5-505df5b175e9" height="30" /> **Tangle**

Tangle is a modern and expressive social platform built to celebrate authenticity and creativity. Designed for seamless user interaction and connection, Tangle is where real stories unfold, passions are explored, and diverse communities thrive.

> 🚧 **Currently in Development**

---

## ✨ Features

- 🔄 Real-time updates via **Socket.io**
- 📸 Create and share **Posts** with text and media
- 🎬 Add expressive **Stories** (with text overlays)
- ❤️ Like, 💬 Comment, 🔄 Follow other users
- 🔔 **Real-time Notifications** for likes, follows, and comments
- 👤 Personalized user profiles
- 🔐 Secure Authentication & Session Management
- 📩 Email verification and OTP handling
- 📱 Mobile-friendly UI built with **Tailwind CSS** & **shadcn/ui**
- 🧩 Modular and scalable architecture

---

## 🧱 Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React.js + TypeScript |
| Styling   | Tailwind CSS + shadcn/ui |
| Backend   | Express.js (Node.js) |
| Database  | MongoDB with Mongoose |
| Real-Time | Socket.io          |
| Auth      | JWT + Express Session |
| Media     | Cloudinary         |


---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB

### Installation
## 🌐 Environment Variables (`.env`)

Create a `.env` file in your `/backend` directory with the following structure:


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`VITE_API_URL`

`MONGO_URL`

`SECRET_JWT`

`SESSION_SECRET`

`NODE_ENV`

`EMAIL_USER`

`EMAIL_PASSWORD`




```bash
# Clone the repo
git clone https://github.com/yourusername/tangle.git
cd tangle

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd server
npm install



