## Delayed Slack Message Sender

A Vue 3 + TypeScript web application that allows you to schedule Slack messages to be sent after a specified delay. Built with Vite, Tailwind CSS, and shadcn‑vue components, and deployed on Vercel.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started (Development)](#getting-started-development)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Environment Variables](#3-environment-variables)
    - [4. Run the Development Server](#4-run-the-development-server)
- [Building for Production](#building-for-production)
    - [1. Build the App](#1-build-the-app)
    - [2. Preview the Production Build](#2-preview-the-production-build)
- [Deployment](#deployment)
    - [Deploying to Vercel](#deploying-to-vercel)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Prerequisites

- **Node.js** v14.18 or higher
- **npm** (comes with Node.js) or **Yarn**
- A **Slack workspace** with permission to create Incoming Webhooks
- A **Slack Incoming Webhook URL**

---

## Getting Started (Development)

Follow these steps to get the project running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ronhedwigzape/ronhedwigzape-delayed-slack-scheduler.git
cd ronhedwigzape-delayed-slack-scheduler
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or with Yarn:
```bash
yarn install
```

### 3. Environment Variables

Create a `.env` file in the project root and define your Slack webhook URL:

```env
VITE_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
```

> **Note:** Prefix (`VITE_`) is required for Vite to expose the variable to client code.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:5173` in your browser.  Hot Module Replacement (HMR) will update the page as you edit your code.

---

## Building for Production

Generate an optimized production build:

### 1. Build the App

```bash
npm run build
# or
yarn build
```

This outputs static assets to the `dist/` directory.

### 2. Preview the Production Build

```bash
npm run serve
# or
yarn serve
```

Visit the URL shown (usually `http://localhost:4173`) to verify your build.

---

## Deployment

### Deploying to Vercel

1. **Install Vercel CLI** (if not already):
   ```bash
   npm install -g vercel
   ```

2. **Login & Deploy**:
   ```bash
   vercel login
   vercel
   ```
    - Vercel auto-detects Vite and configures the build command (`npm run build`) and output directory (`dist`).

3. **Production Deploy**:
   ```bash
   vercel --prod
   ```
   Your app will be live at `https://<your-project>.vercel.app`.

---

## Project Structure

```text
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── components/  # shadcn-vue UI components
│   ├── lib/         # Utility functions (e.g., cn)
│   ├── App.vue      # Main application component
│   ├── main.ts      # Entry point
│   └── index.css    # Tailwind imports
├── dist/            # Production build output
├── .env             # Environment variables
├── tsconfig.json    # TypeScript config
├── vite.config.ts   # Vite config (aliases, plugins)
├── tailwind.config.js # Tailwind CSS config
└── package.json     # Scripts & dependencies
```

---

## Troubleshooting

- **CORS Errors**: Ensure `sendToSlack()` uses `URLSearchParams` instead of `application/json` to avoid Slack CORS preflight issues.
- **Env Vars Not Loaded**: Verify your `.env` starts with `VITE_` and you restarted the dev server after changes.
- **Port in Use**: Vite will auto-select a new port if the default (`5173`) is busy.

---

## License

This project is licensed under the [MIT License](LICENSE).

