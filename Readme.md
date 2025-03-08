# Dashboard App

The Dashboard App is a dynamic platform designed to help users seamlessly manage their data. With intuitive tools to view sheets, create tables, and add columns, it simplifies data organization and visualization for both beginners and power users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contact](#contact)

## Features

- **Sheet Management:** View and organize multiple sheets in a single dashboard.
- **Table Creation:** Easily create new tables within any sheet.
- **Column Addition:** Customize your tables by adding new columns.
- **Data Manipulation:** Edit, update, and manage table data in real-time.
- **User Authentication:** Secure login with role-based access to ensure data privacy.
- **Responsive Design:** Fully optimized for desktops, tablets, and mobile devices.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Deployment:** Vercel, Render
- **Styling:** Tailwind CSS

## Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- A MongoDB database instance
- Git

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/pratik/Dashboard.git
   cd Dashboard
2. **Install Frontend Dependencies:**

   ```bash
   npm install
3. **Install Backend Dependencies:**

   ```bash
    cd backend
    npm install
4. **Configure Environment Variables:**

    Create a .env file in the backend and add the necessary configurations:

        PORT= 4000
        MONGO_URI = Enter your url
        JWT_SECRET = Enter your jwt_scret

    Create a .env file in the project root and add the necessary configurations: 

        REACT_APP_API_URL  = YOUR_BACKEND_URL/api/v1
        SOCKET_IO = YOUR_BACKEND_URL

5. **Run the Application:**

    For development:

        npm run dev

    For production:

        npm start

## Contact
For questions or support, please contact:

    Maintainer: Pratik Mehakare
    GitHub Repository: https://github.com/pratikmehakare/Dashboard.git