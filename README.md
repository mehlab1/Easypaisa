# Easypaisa Project

A modern digital wallet application with a clean separation between frontend and backend.

## 📁 Project Structure

```
Easypaisa/
├── frontend/           # React-based frontend application
│   ├── src/           # React components and pages
│   ├── package.json   # Frontend dependencies
│   └── README.md      # Frontend documentation
├── backend/            # Express.js backend API
│   ├── server/        # Server code and routes
│   ├── shared/        # Shared types and schemas
│   ├── package.json   # Backend dependencies
│   └── README.md      # Backend documentation
└── README.md          # This file
```

## 🚀 Quick Start

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```
Access at: http://localhost:3000

### Backend Development
```bash
cd backend
npm install
npm run dev
```
Access at: http://localhost:5000

## 🎯 Features

### Frontend
- 🏠 **Home Dashboard** - Wallet balance and quick actions
- 📊 **Budget Management** - Category-wise spending tracking
- 📍 **Cash Points** - Find nearby locations
- 👤 **Account Management** - Profile and transaction history
- 🤖 **AI Assistant** - Chat interface with smart suggestions
- 🎨 **Responsive Design** - Mobile-first with desktop sidebar

### Backend
- 🔐 **Authentication** - User management and security
- 💾 **Database** - Data persistence with Drizzle ORM
- 🔄 **API Routes** - RESTful endpoints
- 📊 **Data Models** - Type-safe schemas

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for development
- Tailwind CSS for styling
- shadcn/ui components
- Wouter for routing

### Backend
- Express.js + TypeScript
- Drizzle ORM
- Neon Database
- JWT Authentication

## 📖 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details 