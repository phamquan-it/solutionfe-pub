# 🌐 solution

**solutionfe-pub** is the public-facing frontend for the Soluti0n platform, built with [Next.js](https://nextjs.org). It offers a modern, fast, and interactive web experience tailored for showcasing livestream content, analytics, or public data dashboards.

---

## 🚀 Getting Started

Install dependencies:
Back-end: https://github.com/phamquan-it/solutionbe-pub
```bash
npm install
# or
yarn install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🧭 Project Structure

- `app/`: Main routing and page components using the App Router.
- `components/`: Shared, reusable UI components (headers, cards, lists).
- `lib/`: Utility functions, API fetchers, and helper logic.
- `styles/`: Tailwind CSS config and global styles.
- `public/`: Static files such as logos, icons, and images.

---

## 💡 Core Features

- 🔍 **Livestream or public content discovery**: Browsing live streams, featured content, or public analytics.
- 🖼️ **Dynamic UI**: Powered by Tailwind CSS with responsive design.
- 📡 **API integration**: Fetch and display data from backend services via REST or GraphQL.
- ⚙️ **Configurable deployment**: Easily connected with backend environments via `.env` settings.

---

## 📦 Technologies Used

- **Next.js 14** – For server-rendered and statically generated pages.
- **TypeScript** – Static typing for scalability and developer confidence.
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- **React** – Component-based rendering with hooks and modern architecture.

---

## 🔧 Environment Configuration

Create a `.env.local` file in the root directory and include variables like:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_NAME=Soluti0n
```

---

## 📈 Future Plans

- ✨ Add animation and transition support via Framer Motion.
- 🌍 Internationalization (i18n) for multi-language support.
- 📲 PWA support for mobile devices.
- 🔒 OAuth integration for private/public stream separation.

---

## 📬 Contributing

Open to suggestions and improvements via pull requests or issues. If you're using this template in your own project, feel free to fork and customize.

---

**© 2025 – Soluti0n Team**
