# git-flow

This repository now includes a simple Next.js dashboard application located in `dashboard-app`.

## Dashboard App Features
- **Next.js** project with TypeScript and routing.
- **Material UI** integration for styling.
- **Recharts** for interactive charting.
- Fetches real-time gold prices from `https://www.goldapi.io` via an API route.

## Running the Dashboard
1. Install dependencies (requires internet access):
   ```bash
   cd dashboard-app
   npm install
   npm run dev
   ```
2. Open the browser at `http://localhost:3000` to view the dashboard.

Set the environment variable `GOLD_API_KEY` with your API token from goldapi.io.
