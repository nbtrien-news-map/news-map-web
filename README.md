# News Map Website

A modern web application built with ReactJS and TypeScript, designed to displays current news events on an interactive world map.

## Demo

👉 [Live Demo](https://news-map.nbtrien.site)

## Project Overview

A web application that displays current news events on an interactive world map, allowing users to explore what's happening across different regions through location-based visualization. It leverages ReactJS for the frontend, TypeScript for type safety, and modern web development practices to ensure a robust and scalable application.

## Features

- **View news by clicking on specific locations on the world map**
- **Filter news by geographic area or region.**
- **Filter news by category such as politics, tech, sports, etc.**
- **Show news based on the user's current location.**

## Technologies Used

- **ReactJS**: Frontend library for building user interfaces
- **TypeScript**: Adds static types to JavaScript for reliability
- **Tailwind CSS**: Utility-first CSS framework
- **Ant Design**: UI components for rapid development
- **Leaflet**: Interactive map library
- **Redux Toolkit**: State management
- **React Router DOM**: Client-side routing
- **Axios**: For HTTP requests
- **React Query**: For data fetching and caching
- **ESLint & Prettier**: For linting and code formatting
- **Vite**: Fast build tool and dev server

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or use Yarn/pnpm)
- **Git**: For version control

---

## 📦 Installation

1. **Clone the repository**:

```bash
git clone https://github.com/nbtrien-news-map/news-map-web
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory.  
Example:

```env
VITE_API_URL=http://localhost:3000/api
VITE_NOMINATION_API_URL=https://nominatim.openstreetmap.org
```

---

## 🚀 Running the Application

### Development mode

```bash
npm run dev
```

App runs at: `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 👤 Author

- GitHub: [nbtrien](https://github.com/nbtrien)
- Website: [portfolio.nbtrien.site](https://portfolio.nbtrien.site)
- Email: trienbanguyen@gmail.com
