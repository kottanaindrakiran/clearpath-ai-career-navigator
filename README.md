# 🚀 ClearPath — AI Career Navigator for Underserved Youth

> AI-powered personalized career roadmaps using only free learning resources.

<img width="1715" height="921" alt="image" src="https://github.com/user-attachments/assets/465c2eee-8b94-4ca1-a605-753e09075eaa" />

<img width="1631" height="798" alt="image" src="https://github.com/user-attachments/assets/4a5e2669-846a-419d-a761-83015b4a6b55" />

<img width="1710" height="971" alt="image" src="https://github.com/user-attachments/assets/062ddd09-afbd-4fec-b3bc-5e07e6a49c5b" />



## 🧠 Problem

Millions of students lack access to structured mentorship, career clarity, and paid learning platforms.

As a result, they:

- Don’t know what to learn
- Follow random tutorials
- Waste years without direction

---

## 💡 Solution

**ClearPath** converts a student’s background, interests, and challenges into a:

✅ Realistic career goal  
✅ Step-by-step roadmap  
✅ Skill gap analysis  
✅ 12-month action plan  
✅ 100% free learning resources  

All powered by AI.

---

## ✨ Features

- 🧠 AI-generated personalized career roadmap
- 🗺️ Visual step-by-step timeline
- 🎯 Skill gap detection
- 📚 Curated free learning resources
- 📆 12-month execution plan
- 👤 Profile-based recommendations
- 📄 Downloadable career plan (PDF)
- 💾 Roadmap storage with Supabase
- ⚡ Beautiful glassmorphism UI
- 📱 Fully responsive design

---

## 🖥️ Live Demo

🌐 **Frontend:**  
https://clearpath-frontend-ten.vercel.app/

⚙️ **Backend API:**  
https://clearpath-ai-career-navigator.onrender.com

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js

### AI
- Groq (LLaMA 3.1)

### Database
- Supabase

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## ⚙️ How It Works

1. User enters education, interests, and challenges
2. Backend sends structured prompt to AI
3. AI returns a career roadmap in JSON format
4. Roadmap is:
   - displayed in UI
   - stored in Supabase
5. User can download the full plan as a PDF

---

## 🧪 Running Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/clearpath-ai-career-navigator.git
cd clearpath-ai-career-navigator
````

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env`

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
GROQ_API_KEY=
```

Run:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

Create `.env`

```
VITE_BACKEND_URL=http://localhost:5000
```

Run:

```bash
npm run dev
```

