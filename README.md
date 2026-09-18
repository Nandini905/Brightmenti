# 🚀 Brightmenti — Enterprise Digital Growth & Automation Platform

<div align="center">

![Brightmenti Logo Banner](https://img.shields.io/badge/BRIGHTMENTI-Build.%20Automate.%20Market.%20Scale.-7b5ac5?style=for-the-badge&logoColor=white)

**Engineering unified digital ecosystems for modern founders, high-volume D2C brands, and scalable enterprises.**

[![Live Demo](https://img.shields.io/badge/Live_Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 🌐 Executive Overview

**Brightmenti** is a high-performance, multi-page agency web application and unified operations platform. Inspired by the refined design aesthetics of **Apple × Stripe × Linear**, it blends visual craftsmanship with conversion-focused UX, automated lead-capture pipelines, and role-protected internal staff portals.

### 🌟 Live Links
- **Public Platform:** [https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/](https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/)
- **Staff Sign-in:** [https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/login](https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/login)
- **Admin Control Center:** [https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/admin](https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/admin)
- **Manager Reception Hub:** [https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/manager](https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/manager)

---

## ✨ Key Feature Highlights

### 🎨 1. Client-Facing Experience
- **Fluid Micro-Interactions & Glassmorphism:** Custom ambient purple/lavender glow tokens, interactive cards, and responsive ergonomics.
- **Interactive Ecosystem Diagram:** Visual node map displaying how Web, Shopify, CRM, WhatsApp automations, and Growth marketing connect into one engine.
- **10 Core Service Disciplines:** Deep-dive cards spanning Headless E-commerce, WhatsApp CRM Automations, Custom Full-Stack Apps, Brand Identity, and Paid Acquisition.
- **Filterable Work & Portfolio Hub:** Dynamic case studies organized by discipline (E-Commerce, Web Platforms, Performance Marketing, Automation).
- **Frictionless Strategy Booking:** Interactive calendar and time slot selector with client qualification questions and instant booking confirmation.
- **Omnichannel CTAs:** WhatsApp floating quick-chat widget, sticky mobile conversion bar, and animated schedule buttons.

---

### 🛡️ 2. Internal Staff & Management Engine (RBAC)

The application features a secure, role-based internal ecosystem accessible to verified staff:

```
                      ┌──────────────────────┐
                      │    /login Portal     │
                      └──────────┬───────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   ▼                           ▼
        ┌─────────────────────┐     ┌─────────────────────┐
        │   Manager Portal    │     │    Admin Portal     │
        │      (/manager)     │     │      (/admin)       │
        ├─────────────────────┤     ├─────────────────────┤
        │ • Lead Pipeline     │     │ • Master Analytics  │
        │ • Status Updates    │     │ • Revenue Metrics   │
        │ • Booking Manager   │     │ • Service Controls  │
        │ • Lead Notes & Call │     │ • System Audit Logs │
        └─────────────────────┘     └─────────────────────┘
```

#### 👑 **Admin Master Control (`/admin`)**
- Real-time agency KPI dashboard (Total Bookings, Pipeline Value, Conversion Rates, Active Projects).
- Full lead lifecycle management with filtering, export, and search.
- System activity audit trail and operational health metrics.
- Master switchboard for managing active service offerings.

#### 🧑‍💼 **Manager Reception Portal (`/manager`)**
- Kanban & list view of incoming client strategy calls and project inquiries.
- One-click workflow triggers (Mark Contacted, Schedule Call, Archive, Add Notes).
- Real-time booking state synchronizer powered by client-side persistence.
- Manager notification badge and direct WhatsApp follow-up launcher.

#### ⚡ **Staff Session Toolbar (`StaffBar`)**
- Persistent top status bar displaying active authenticated staff member, role badge (`ADMIN` / `MANAGER`), fast portal switching, and 1-click logout.

---

## 🔑 Pre-Configured Test Credentials

For evaluation and testing, you can use these built-in staff accounts on the [/login](https://brightmenti-ko1fgvdtm-nandinipathak877-1048s-projects.vercel.app/login) page (or click the **"Quick Test Accounts"** buttons for 1-click login):

| Role | Work Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | `admin@brightmenti.com` | `Admin@123456` | Full Access (`/admin`, `/manager`, Public) |
| **🧑‍💼 Manager 1** | `sarah.manager@brightmenti.com` | `Manager@123456` | Lead & Booking Management (`/manager`) |
| **🧑‍💼 Manager 2** | `alex.manager@brightmenti.com` | `Manager@123456` | Lead & Booking Management (`/manager`) |

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Core Runtime** | React 19 + TypeScript 5.7 | Modern component model with strict type safety |
| **Bundler / Build** | Vite 8 | Ultra-fast HMR and optimized production bundle |
| **Styling Engine** | Tailwind CSS v4 | Zero-runtime CSS with modern color palette & variables |
| **Animation Engine** | Framer Motion + CSS3 | Hardware-accelerated transitions & layout animations |
| **Routing** | React Router v8 | Single-Page Application client routing with protected wrappers |
| **Icons** | Lucide React | Consistent, scalable SVG iconography |
| **Persistence** | LocalStorage + Context API | Synchronized state management for bookings & staff auth |
| **Deployment** | Vercel | Global edge CDN delivery and continuous deployment |

---

## 📂 Project Directory Structure

```text
├── app/
│   └── api/
│       └── lead/
│           └── route.ts          # Serverless lead ingestion & rate-limiting
├── components/                   # Core public UI components
│   ├── BookingForm.tsx           # Multi-step strategy booking form
│   ├── EcosystemDiagram.tsx      # Interactive connected architecture diagram
│   ├── Header.tsx                # Dynamic glassmorphic navbar
│   ├── Footer.tsx                # Comprehensive sitemap footer
│   ├── WhatsAppFloatingButton.tsx# Omnichannel contact trigger
│   └── StickyMobileCTA.tsx       # Conversion bar for mobile viewports
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.tsx# Role-based route guard
│   │   │   └── StaffBar.tsx      # Sticky staff session bar
│   │   ├── ManagerNotificationBadge.tsx
│   │   └── ManagerNotificationModal.tsx
│   ├── content/                  # Structured data models
│   │   ├── services.ts           # 10 comprehensive service specs
│   │   ├── portfolio.ts          # Case studies and client projects
│   │   └── industries.ts         # Target industry verticals
│   ├── context/
│   │   └── AuthContext.tsx       # RBAC Authentication provider & session state
│   ├── lib/
│   │   ├── bookingStore.ts       # Booking state store & dispatchers
│   │   └── validation.ts         # Form validation schemas
│   ├── pages/
│   │   ├── Home.tsx              # High-conversion landing page
│   │   ├── About.tsx             # Philosophy, ethos, and team
│   │   ├── Services.tsx          # Complete services hub
│   │   ├── Portfolio.tsx         # Filterable case studies
│   │   ├── Booking.tsx           # Dedicated strategy call booking
│   │   ├── Contact.tsx           # Custom project intake
│   │   ├── Login.tsx             # Staff authentication with 1-click demo accounts
│   │   ├── ManagerPortal.tsx     # Operations & lead pipeline hub
│   │   └── AdminPortal.tsx       # Master administration & KPI control room
│   ├── index.css                 # Design system tokens & Tailwind imports
│   └── main.tsx                  # Application bootstrap entrypoint
├── index.html
├── package.json
└── vite.config.ts
```

---

## ⚡ Quick Start & Local Development

### 1. Prerequisites
- **Node.js** 18.x or higher
- **pnpm** (recommended) or **npm** / **yarn**

### 2. Clone the Repository
```bash
git clone https://github.com/Nandini905/Brightmenti.git
cd Brightmenti
```

### 3. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 4. Start Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or your terminal output URL) in your browser.

### 5. Build for Production
```bash
pnpm build
# or
npm run build
```

---

## ⚙️ Environment Variables (Optional)

Create a `.env` file in the project root to configure external integrations:

```env
# Optional WhatsApp number for direct client chat (international format, no + or spaces)
VITE_WHATSAPP_NUMBER=919876543210

# Lead webhook notification endpoint (optional CRM bridge)
VITE_LEAD_WEBHOOK_URL=https://your-crm-webhook.com/endpoint
```

---

## 📄 License & Intellectual Property

© 2026 **Brightmenti**. All rights reserved.  
Designed and engineered for high-growth modern brands and enterprises.
