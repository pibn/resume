# System Architecture Documentation

## Overview

This is a modern full-stack portfolio application built with a retro desktop interface aesthetic. The application simulates a desktop environment with draggable windows displaying portfolio content. It uses a TypeScript-based stack with React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom retro-inspired design system
- **UI Components**: Custom components with a desktop OS theme
- **State Management**: React Context API for window management
- **Build Tool**: Vite with HMR support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Build Tool**: esbuild for production builds

### Shared Architecture
- **Schema**: Shared database schema definitions using Drizzle
- **Types**: Common TypeScript interfaces and types
- **Validation**: Zod schemas for data validation

## Key Components

### Frontend Components
1. **Desktop Environment**
   - `Desktop.tsx`: Main desktop interface with background and icons
   - `MenuBar.tsx`: Top menu bar with system information
   - `WindowManager.tsx`: Manages all open windows and their states

2. **Window System**
   - `MacWindow.tsx`: Draggable window component with OS-like controls
   - `WindowContext.tsx`: Context provider for window state management
   - Individual window components for different portfolio sections

3. **Portfolio Windows**
   - `AboutWindow.tsx`: Personal information display
   - `PortfolioWindow.tsx`: Project showcase with before/after comparisons
   - `ContactWindow.tsx`: Contact information and message form
   - `SkillsWindow.tsx`: Skills and tools display
   - `ExperienceWindow.tsx`: Work experience timeline

### Backend Components
1. **Server Setup**
   - Express.js server with middleware configuration
   - Vite integration for development mode
   - Static file serving for production

2. **Storage Layer**
   - Abstract storage interface for CRUD operations
   - In-memory storage implementation (MemStorage)
   - Database schema definition with user management

3. **API Layer**
   - Modular route registration system
   - Error handling middleware
   - Request logging and monitoring

## Data Flow

### Window Management Flow
1. User double-clicks desktop icon
2. `DesktopIcon` component triggers window opening
3. `WindowContext` manages window state (position, z-index, focus)
4. `WindowManager` renders appropriate window component
5. `MacWindow` provides draggable interface with controls

### Development Flow
1. Vite serves React application with HMR
2. Express server handles API routes with `/api` prefix
3. Shared schema provides type safety across frontend/backend
4. Database operations use Drizzle ORM with type-safe queries

### Production Flow
1. Vite builds optimized React bundle
2. esbuild bundles Express server
3. Static files served by Express
4. Database connections via Neon serverless PostgreSQL

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM for UI framework
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Database**: Drizzle ORM, Neon serverless PostgreSQL driver
- **Validation**: Zod for schema validation
- **UI Components**: Radix UI primitives for accessible components

### Development Dependencies
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Development**: tsx for TypeScript execution, Replit plugins
- **Icons**: Lucide React for UI icons

### Runtime Dependencies
- **Server**: Express.js, session management with connect-pg-simple
- **Utilities**: nanoid for ID generation, date-fns for date handling
- **Type Safety**: drizzle-zod for database schema validation

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express API server with middleware mode
- Real-time error overlay for debugging
- Automatic TypeScript compilation

### Production Build Process
1. Frontend: Vite builds optimized React bundle to `dist/public`
2. Backend: esbuild bundles Express server to `dist/index.js`
3. Database: Drizzle migrations applied via `db:push` command
4. Static serving: Express serves built frontend files

### Database Management
- Schema defined in shared TypeScript files
- Migrations managed by Drizzle Kit
- Development uses in-memory storage fallback
- Production connects to Neon PostgreSQL database

## Changelog
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.