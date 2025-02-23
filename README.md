# GoalFund Backend

## Overview

GoalFund is a web-based application that enables communities or groups to contribute money towards a common goal while ensuring transparency and accountability. This document outlines the backend technologies used to power the GoalFund platform.

To run application run `npm install && npm start dev`, or build and run via `npm install && npm run build && node ./dist/src/main.js`

## Technologies Used

### **1. Backend Framework** - **NestJS**

- A progressive Node.js framework for building efficient and scalable server-side applications.
- Uses TypeScript for type safety and maintainability.
- Built on top of Express (or Fastify for better performance).
- Implements a modular structure for better organization.

### **2. Database** - **PostgreSQL + Drizzle ORM**

- **PostgreSQL**: A powerful open-source relational database system, chosen for its reliability and performance.
- **Drizzle ORM**:
  - Provides type-safe database queries with TypeScript.
  - Eliminates the need for complex migrations.
  - Optimized for modern database usage with efficient SQL queries.

### **3. Authentication & Security**

- **Server-Side Cookies for Authentication**:
  - Secure, HTTP-only cookies for session management.
  - Reduces risks associated with token-based authentication.
- **SessionStorage (Fallback for browsers blocking cookies)**
- **Two-Factor Authentication (2FA)**: To enhance security for users.

### **4. Payments Integration** - **Squad Payment Gateway**

- Handles deposits and withdrawals securely.
- Uses a **single virtual account** to manage all contributions.
- Webhook integration for real-time payment updates.

### **5. Real-Time Updates** - **Socket.io**

- Enables live updates for:
  - Contributions and deposits.
  - Withdrawals and proof confirmations.
  - Notifications and organizer interactions.

### **6. File Storage** - **Cloudinary**

- Used for storing and serving images securely.
- Handles proof-of-withdrawal document storage.

### **7. Logging & Monitoring** - **Sentry**

- Tracks errors, crashes, and performance issues in real-time.
- Provides deep insights for debugging and issue resolution.

### **8. Hosting & Deployment**

- **Backend Hosting**: **Koyeb**
  - Serverless cloud infrastructure for fast and scalable deployments.
- **Frontend Hosting**: **Netlify** (for React frontend)

### **9. API Documentation**

- **Swagger (OpenAPI)**: Provides interactive API documentation.
- Ensures seamless integration with frontend and external developers.

## Development Workflow

1. **Backend Development:** Build scalable REST APIs using NestJS.
2. **Database Management:** Define and migrate schemas using Drizzle ORM.
3. **Authentication & Security:** Implement robust auth flow using cookies and 2FA.
4. **Payments Integration:** Setup Squad virtual accounts and webhook listeners.
5. **Real-Time Updates:** Use Socket.io for live updates.
6. **Testing & Debugging:** Monitor using Sentry, unit tests for endpoints.
7. **Deployment:** Push to Koyeb for backend hosting.

## Future Enhancements

- Implement AI-powered fraud detection for transactions.
- Introduce blockchain-based transparency for high-value contributions.
- Add more analytics for contribution trends and user engagement.
