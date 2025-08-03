# Easypaisa Backend

Express.js backend API for the Easypaisa digital wallet application.

## 📁 Structure

```
backend/
├── server/             # Server implementation
│   ├── index.ts       # Main server entry point
│   ├── routes.ts      # API route definitions
│   ├── storage.ts     # Data storage layer
│   └── vite.ts        # Vite integration
├── shared/            # Shared types and schemas
│   └── schema.ts      # Database schemas
├── package.json       # Backend dependencies
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── drizzle.config.ts  # Database configuration
└── .replit           # Replit configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd backend
npm install
```

### Development
```bash
npm run dev
```

The server will start on http://localhost:5000

### Production Build
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
```

### Database Setup
The backend uses Drizzle ORM with Neon Database:

```bash
# Push schema to database
npm run db:push
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🛠 Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database layer
- **Neon Database** - PostgreSQL hosting
- **JWT** - Authentication
- **Vite** - Development server

## 📝 Development

### Adding New Routes
1. Create route handler in `server/routes.ts`
2. Add route to the Express app
3. Update TypeScript types if needed

### Database Changes
1. Update schema in `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update API endpoints to use new schema

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Environment Setup
Ensure all environment variables are set in production:
- `NODE_ENV=production`
- `PORT` (usually 5000)
- `DATABASE_URL`
- `JWT_SECRET`

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass

## 📄 License

MIT License - see LICENSE file for details 