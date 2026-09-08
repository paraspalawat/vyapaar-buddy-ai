# Bharat Vyapaar AI 🇮🇳

> An AI-powered business platform designed to help Indian MSME and retail shop owners make faster, smarter day-to-day decisions.

## Overview

Bharat Vyapaar AI brings practical business workflows into one modern dashboard experience. The platform is designed around the needs of small retailers, with tools for inventory visibility, sales forecasting, pricing decisions, WhatsApp communication, advertising, website management, and an AI business assistant.

## Key Features

- **Business Dashboard** — Centralized overview for day-to-day business activity.
- **Sales Forecasting** — Use historical business information to support demand and planning decisions.
- **Inventory Management** — Track products and inventory-related workflows from a single interface.
- **Smart Pricing** — Support pricing decisions with a business-focused workflow.
- **WhatsApp Marketing** — Prepare and manage customer communication workflows.
- **Advertising Tools** — Create and organize promotional activities for products and offers.
- **Website Management** — Business-oriented tools for managing an online presence.
- **AI Assistant** — An in-app assistant interface for business-oriented questions and actions.
- **Multi-language Experience** — Includes application-level language support for Indian users.
- **Responsive UI** — Built as a modern dashboard application for desktop and smaller screens.

## Application Flow

```text
                 ┌──────────────────────┐
                 │      Login / Auth    │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Business Dashboard │
                 └──────────┬───────────┘
                            │
        ┌───────────────────┼────────────────────┐
        ▼                   ▼                    ▼
   Forecasting          Inventory          Smart Pricing
        │                   │                    │
        └───────────────────┼────────────────────┘
                            │
             ┌──────────────┼───────────────┐
             ▼              ▼               ▼
         WhatsApp          Ads           Website
             │              │               │
             └──────────────┼───────────────┘
                            ▼
                     AI Business Assistant
```

## Tech Stack

| Area | Technology |
|---|---|
| Frontend | React + TypeScript |
| Build Tool | Vite |
| UI | Tailwind CSS + Radix UI / shadcn-style components |
| Routing | React Router |
| Data Fetching | TanStack React Query |
| Forms & Validation | React Hook Form + Zod |
| Backend Services | Supabase |
| Charts | Recharts |
| Icons | Lucide React |
| Testing | Vitest / Testing Library |

The project dependencies and scripts are configured for a Vite + React + TypeScript application with Supabase integration and a reusable component-based UI system. fileciteturn21file0L2-L5

## Project Structure

```text
vyapaar-buddy-ai/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI and layout components
│   ├── contexts/            # Application-level state and language context
│   ├── pages/               # Login, dashboard and feature pages
│   ├── App.tsx              # Application routes and providers
│   └── ...
├── supabase/                # Supabase configuration / backend resources
├── package.json
├── vite.config.ts
└── README.md
```

The application currently routes users through login into dedicated dashboard features including forecasting, inventory, WhatsApp, ads, website, assistant, pricing, and settings. fileciteturn22file0L2-L5

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A configured Supabase project for features that require backend services

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm run test
```

## Environment Variables

Keep credentials and service configuration in a local `.env` file. Do not commit production secrets, access tokens, or private keys to the repository.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Product Direction

The goal of Bharat Vyapaar AI is to make useful business intelligence accessible to small and medium-sized Indian retailers without requiring a complex enterprise system. The product combines familiar retail workflows with AI-assisted decision support in a single application.

## Future Improvements

- More advanced sales and demand forecasting models
- Deeper inventory analytics and low-stock alerts
- Automated customer segmentation and campaigns
- Richer AI-driven business recommendations
- Role-based access for business teams
- Production-ready observability and analytics
- Integration with additional commerce and payment platforms

## Security & Privacy

Application credentials should be supplied through environment variables and kept outside version control. Backend access should be configured using Supabase policies appropriate for the deployment environment.

## Author

**Paras Palawat**  
Full Stack Developer · AI & Open Source Enthusiast

[GitHub](https://github.com/paraspalawat)
