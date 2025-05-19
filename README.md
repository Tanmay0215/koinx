\
# KoinX Assignment Frontend

This project is a frontend application built with React and Vite. It displays cryptocurrency holdings and tax harvesting information.

## Deployed Link

You can access the deployed application here: [https://koinx-sooty-ten.vercel.app/](https://koinx-sooty-ten.vercel.app/)

## Features

- **Display Cryptocurrency Holdings:** View a list of your cryptocurrency assets, including their current value and individual holdings.
- **Tax Harvesting Information:** Access details on short-term and long-term capital gains, both before and after potential tax harvesting.
- **Dark Mode:** Switch between light and dark themes for comfortable viewing in different lighting conditions.
- **Loading States:** Clear visual indicators when data is being fetched from the backend.
- **Error Handling:** Informative messages if data fetching fails.
- **Responsive Design:** The application is designed to work seamlessly across various screen sizes.

## Folder Structure

```
koinx/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── HoldingRow.jsx
│   │   ├── Holdings.jsx
│   │   ├── Navbar.jsx
│   │   └── TaxHarvestingInfo.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tanmay0215/koinx
    cd koinx
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm (or yarn) installed.
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your backend URL:
    ```env
    VITE_BACKEND_URL=https://koinx-backend-8cya.onrender.com
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173`.

5.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This command will create a `dist` folder with the production-ready static assets.
