# 🏕️ TravelTrucks Frontend

## 🌟 Project Overview

This project serves as the official frontend application for **TravelTrucks**, a camper rental
service. The application provides users with an efficient platform to browse, filter, manage
favorites, and submit booking requests for various camper models.

It is built upon **Next.js** (App Router), utilizing **TypeScript**, **Zustand** for state
management, and **Axios** for API interaction.

## 🔗 Live Demo & API

| Category        | Link                                                           | Notes                                                                       |
| :-------------- | :------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| **Live Demo**   | [Live site on Vercel](https://travel-truck-liard.vercel.app)   |                                                                             |
| **Backend API** | [MockAPI](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers) | Supports `GET /campers` (with filtering/pagination) and `GET /campers/:id`. |

## 🚀 Key Features & Pages

| Page/Functionality           | Details                                                                                                                                                                                        |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home (`/`)**               | Banner with the main "View Now" Call-to-Action.                                                                                                                                                |
| **Catalog (`/catalog`)**     | **Backend Filtering** by: **Location** (text), **Camper Type** (single selection), and **Features** (multi-select: AC, Kitchen, TV, etc.). Uses "Load More" button for **Backend Pagination**. |
| **Details (`/catalog/:id`)** | Detailed information, image gallery, and tabs for **Features** (transmission, engine, AC, etc.) and **Reviews**.                                                                               |
| **Booking Form**             | Integrated form on the details page with a success notification upon submission.                                                                                                               |
| **Favorites (`/favorites`)** | Persistent list of user-selected campers (persists across page reloads).                                                                                                                       |

## ⚙️ Technologies Used

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:** **Zustand** (for filters and favorites)
- **HTTP Client:** Axios
- **Styling:** (Specify your styling library: CSS Modules / Styled Components / etc.)

## 🧠 State Management & Core Logic

1.  **Filter Reset:** When filters are applied, the application **resets previous search results**
    to ensure data accuracy before fetching new filtered data from the backend.
2.  **Pricing:** Rental price is displayed in the **X.00** format (e.g., 8000.00).
3.  **Loaders:** Loaders are displayed during all asynchronous API requests.

## 💻 Installation

```bash
git clone YOUR_REPO_URL
cd your-project
npm install
npm run dev
```
