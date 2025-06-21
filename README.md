# Gearment Frontend

Modern web application for the Gearment platform, featuring a sleek UI and robust functionality for managing leave requests and other HR operations.

## Tech Stack

### Core
- **React** - A JavaScript library for building user interfaces
- **Next.js** - React framework for production-grade applications
- **TypeScript** - Strongly typed programming language that builds on JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS
- **Lucide Icons** - Beautiful & consistent icon set

### State Management & Data Fetching
- **TanStack Query** (formerly React Query) - Powerful asynchronous state management

### Form Handling
- **React Hook Form** - Performant, flexible and extensible forms
- **Zod** - TypeScript-first schema validation

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Pluggable JavaScript linter
- **Prettier** - Opinionated code formatter

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- pnpm (v7.x or later)

### Installation

1. Clone the repository

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Build

Create a production build:

```bash
pnpm build
```

Run the production build locally:

```bash
pnpm start
```

## License

This project is licensed under the MIT License
