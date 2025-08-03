# Overview

This is a React/TypeScript financial application (Easypaisa mobile wallet clone) built with a full-stack architecture. The frontend uses React with modern UI components (shadcn/ui), while the backend is built with Express.js and uses Drizzle ORM for database operations. The application focuses on providing a mobile-first user experience for financial services like wallet management, bill payments, and budget tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Mobile-First Design**: Responsive layout with mobile navigation bar that transforms to sidebar on desktop

## Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ES modules
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Development Server**: Vite integration for hot module replacement in development

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle-kit for migrations and schema management
- **Session Storage**: PostgreSQL session store using connect-pg-simple
- **Development Storage**: In-memory storage implementation for local development

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL store
- **User Schema**: Basic user model with username/password authentication
- **Validation**: Zod schemas for runtime type validation integrated with Drizzle

## UI/UX Design Patterns
- **Component Structure**: Modular component architecture with separate UI primitives
- **Responsive Design**: Mobile-first approach with breakpoint at 768px
- **Brand Colors**: Custom Easypaisa green theme (#A7C638) integrated throughout
- **Navigation**: Bottom navigation on mobile, sidebar on desktop
- **Card-Based Layout**: Clean card interfaces for financial data presentation

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Integration between Drizzle and Zod for schema validation
- **@tanstack/react-query**: Server state management and caching

## UI Component Libraries
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **lucide-react**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs
- **tailwindcss**: Utility-first CSS framework

## Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class utility
- **nanoid**: URL-safe unique ID generator
- **cmdk**: Command palette component
- **wouter**: Lightweight client-side routing