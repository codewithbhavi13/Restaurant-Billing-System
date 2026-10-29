# 🍽️ RestaurantOS — Restaurant Billing & Menu Management System

RestaurantOS is a full-stack web application designed to simplify restaurant operations. It will allow restaurant staff to manage food menu items, create customer bills, calculate totals, and generate printable invoices.

The project is being developed using **Next.js, TypeScript, Tailwind CSS, MongoDB Atlas, and Mongoose**. It is also a learning project to understand Next.js concepts by building a practical application.

## 🚀 Project Objectives

- Manage restaurant food menu items.
- Display food items with images, categories, and prices.
- Build a billing interface for selecting food items and quantities.
- Calculate bill totals automatically.
- Generate downloadable and printable invoices.
- Provide an organized and responsive user interface.

## 🛠️ Technology Stack

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| Next.js (App Router) | Frontend and backend API development    |
| React.js             | Building reusable UI components         |
| TypeScript           | Type safety and maintainable code       |
| Tailwind CSS         | Responsive UI styling                   |
| Node.js              | JavaScript runtime                      |
| MongoDB Atlas        | Cloud database                          |
| Mongoose             | MongoDB schemas and database operations |
| Zod                  | Request data validation                 |
| Postman              | API testing                             |
| Git & GitHub         | Version control and project hosting     |

## 📌 Current Features

### 1. MongoDB Database Connection

- Connected the application to MongoDB Atlas.
- Created a reusable database connection utility.
- Implemented connection caching to avoid unnecessary reconnections during development.

### 2. Menu Item Management API

Implemented REST API endpoints for creating, retrieving, updating, and deleting menu items.

Each menu item can contain:

- Name
- Description
- Category
- Price
- Food image URL
- Availability status
- Creation and update timestamps

### 3. Request Validation

- Used Zod to validate incoming menu data.
- Validated required fields, string lengths, image URLs, and prices.
- Returned meaningful validation errors for invalid requests.

### 4. Error Handling

- Handled invalid JSON requests.
- Validated MongoDB ObjectIds.
- Returned appropriate HTTP status codes for invalid IDs and missing menu items.
- Added server-side error logging.

### 5. API Testing

Tested the menu endpoints using Postman, including successful requests, invalid IDs, and nonexistent menu items.

## 🔌 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| GET    | `/api/health`   | Check database connectivity |
| GET    | `/api/menu`     | Retrieve all menu items     |
| POST   | `/api/menu`     | Create a menu item          |
| GET    | `/api/menu/:id` | Retrieve a menu item by ID  |
| PATCH  | `/api/menu/:id` | Update selected menu fields |
| DELETE | `/api/menu/:id` | Delete a menu item          |

### Example: Create a Menu Item

**POST** `/api/menu`

```json
{
  "name": "Cheese Burger",
  "description": "Burger with cheese",
  "category": "Burger",
  "pricePaise": 19900,
  "imageUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
}
```

Prices are stored as integer paise to avoid floating-point rounding problems when handling money. For example, `19900` paise represents ₹199.00.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- A MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd restaurant-os
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

Replace the placeholder with your MongoDB Atlas connection string.

**Security:** Never commit `.env.local` or expose your database credentials on GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the API

Use Postman to send requests to the endpoints listed above.

## 📂 Project Structure

```text
restaurant-os/
├── app/
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts
│   │   └── menu/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── validations/
│   │   └── menu.ts
│   └── mongodb.ts
├── models/
│   └── MenuItem.ts
├── public/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

> `.env.local` is a local configuration file and should not be committed to the repository.

## 🗺️ Development Roadmap

- [x] Next.js project setup
- [x] MongoDB Atlas connection
- [x] Menu item Mongoose model
- [x] Zod request validation
- [x] Menu CRUD API
- [x] Basic API error handling and Postman testing
- [ ] Restaurant dashboard UI
- [ ] Menu listing with food images and prices
- [ ] Add, edit, and delete menu forms
- [ ] Billing cart and quantity management
- [ ] Automatic bill calculation
- [ ] Invoice generation and printing
- [ ] Authentication and role-based access
- [ ] Deployment

## 🔒 Security Considerations

The current menu API is intended for local development. Authentication and authorization have not yet been implemented, so the endpoints should not be exposed publicly in production.

Before deployment, the application will need appropriate access controls, stronger production error handling, and secure environment configuration.

## 🎯 Learning Outcomes

Through this project, I am learning to:

- Build full-stack applications using the Next.js App Router.
- Create REST APIs using Next.js Route Handlers.
- Connect MongoDB Atlas using Mongoose.
- Validate API requests with Zod.
- Handle HTTP status codes and API errors correctly.
- Manage source code using Git and GitHub.
- Build a complete application incrementally, from backend APIs to frontend UI.

## 📌 Project Status

**Current stage:** Backend setup and menu CRUD APIs completed. Frontend UI and billing functionality are planned for upcoming development.
