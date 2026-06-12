# SpendSmart

A mobile-first daily expense tracker with:

- Expense creation, editing, deletion, search, and filters
- Dashboard totals and category spending chart
- Monthly budget tracking and warnings
- English and Indonesian translations
- Dark mode, CSV export, and localStorage persistence

## Run directly

Open `index.html` in a browser. It is a standalone build with no installation or
internet connection required.

## React development

The React/Vite source is in `src/`. Install Node.js 18 or newer, then run:

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The original Vite entry page is preserved as `index.vite.html`.

## Optional ngrok tunnel

Install the `ngrok` Python SDK and set `NGROK_AUTHTOKEN` in your environment,
then start a local server on port 8080 and run:

```bash
python run_spendsmart_tunnel.py
```

Local tunnel URLs and process files are excluded from version control.
