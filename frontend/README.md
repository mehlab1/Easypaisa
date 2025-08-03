# Easypaisa Frontend

A modern React-based frontend for the Easypaisa digital wallet application, featuring hyperpersonalization, smart budgeting, and AI assistance.

## Features

- 🏠 **Home Dashboard** - Wallet balance, quick actions, and smart suggestions
- 📊 **Budget Management** - Category-wise spending tracking with progress bars
- 📍 **Cash Points** - Find nearby Easypaisa locations with service details
- 👤 **Account Management** - Profile settings, transaction history, and rewards
- 🤖 **AI Assistant** - Chat interface with quick replies and smart suggestions
- 🎨 **Responsive Design** - Mobile-first design with desktop sidebar

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Wouter** for routing
- **Lucide React** for icons
- **Framer Motion** for animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mehlab1/Easypaisa.git
cd Easypaisa/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── home/          # Home page components
│   │   ├── budget/        # Budget page components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Layout.tsx     # Main layout component
│   │   ├── NavBar.tsx     # Navigation component
│   │   └── ChatDrawer.tsx # AI Assistant chat
│   ├── pages/
│   │   ├── Home.tsx       # Home dashboard
│   │   ├── Budget.tsx     # Budget management
│   │   ├── CashPoints.tsx # Cash points locator
│   │   └── Account.tsx    # Account management
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and mock data
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Features Overview

### Home Dashboard
- Wallet balance with visibility toggle
- Smart suggestions (NBA) based on transaction history
- Quick action buttons for common tasks
- Personalized offers (NBO) display
- AI Assistant icon for chat access

### Budget Management
- Category-wise budget tracking
- Progress bars with over-budget indicators
- Monthly/weekly budget summaries
- Visual spending analytics

### Cash Points
- Location-based search
- Service availability tags
- Distance and rating information
- Contact details and hours
- Interactive map placeholder

### Account Management
- User profile with KYC status
- Transaction history with categorization
- Account settings and preferences
- Rewards and offers section
- Security and privacy controls

### AI Assistant
- Bottom drawer chat interface
- Quick reply buttons
- Natural language processing ready
- Context-aware suggestions

## Design System

The app follows Easypaisa's brand guidelines:
- **Primary Color**: `#A7C638` (Easypaisa Green)
- **Typography**: Poppins font family
- **Gradients**: Green gradient backgrounds
- **Components**: Consistent card-based design

## Development

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/NavBar.tsx`

### Adding New Components
1. Create component in appropriate folder under `src/components/`
2. Export from index file if needed
3. Import and use in pages

### Styling
- Use Tailwind CSS classes
- Follow the design system colors
- Ensure responsive design
- Use shadcn/ui components when possible

## Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables
Create a `.env` file for any environment-specific configurations:
```
VITE_API_URL=your_api_url_here
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details 