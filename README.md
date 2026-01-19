# Cost Manager – RESTful Web Services

Final Project – Asynchronous Server-Side Development Course

---

## 📌 Project Overview

**Cost Manager** is a RESTful backend system for managing users, costs, monthly reports, and system logs.  
The project is implemented as **four independent microservices**, each running as a separate Node.js process and responsible for a specific domain:

- **Users Service** - User management and user details with cost totals
- **Costs Service** - Cost management and monthly reports generation
- **Logs Service** - Centralized logging and log ingestion
- **Admin Service** - System information and developer team details

The system is built using:
- **Node.js + Express** for RESTful APIs
- **MongoDB Atlas + Mongoose** for data persistence
- **Pino** for structured logging
- **Jest** for endpoint-based unit testing

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git** (for cloning the repository)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShirGanon/cost_manager.git
   cd cost_manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB connection string
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   
   # Optional: Service ports (defaults shown)
   PORT_USERS=3001
   PORT_COSTS=3002
   PORT_LOGS=3003
   PORT_ADMIN=3004
   
   LOGS_BASE_URL=http://localhost:3003
   ```

   **Note:** Replace the `MONGO_URI` with your actual MongoDB Atlas connection string or local MongoDB URI.

---

## 🏃 Running the Services

### Run All Services Together

Start all four services simultaneously:
```bash
npm run start:all
```

This uses `npm-run-all` to start all services in parallel.

### Run Services Individually

Start each service separately:

```bash
# Users Service (port 3001)
npm run start:users

# Costs Service (port 3002)
npm run start:costs

# Logs Service (port 3003)
npm run start:logs

# Admin Service (port 3004)
npm run start:admin
```

### Verify Services are Running

After starting, you should see console output like:
```
users-service listening on 3001
costs-service listening on 3002
logs-service listening on 3003
admin-service listening on 3004
```

---

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The test suite uses:
- **Jest** as the test framework
- **Supertest** for HTTP endpoint testing

---

## 📁 Project Structure

```
cost_manager/
├── db/
│   └── mongo.js                 # Shared MongoDB connection logic
│
├── models/                      # Mongoose schemas
│   ├── user.model.js           # User schema
│   ├── cost.model.js           # Cost schema
│   ├── report.model.js         # Monthly report schema
│   └── log.model.js            # Log entry schema
│
├── services/                    # Microservices
│   ├── users_service/
│   │   ├── app.js              # Express app configuration
│   │   ├── server.js           # Service entry point
│   │   ├── controllers/
│   │   │   └── users.controller.js
│   │   └── routes/
│   │       └── users.routes.js
│   │
│   ├── costs_service/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   ├── costs.controller.js
│   │   │   └── reports.controller.js
│   │   ├── routes/
│   │   │   ├── costs.routes.js
│   │   │   └── reports.routes.js
│   │   └── services/
│   │       └── report.service.js  # Report computation logic
│   │
│   ├── logs_service/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   ├── ingest.controller.js
│   │   │   └── logs.controller.js
│   │   └── routes/
│   │       ├── ingest.routes.js
│   │       └── logs.routes.js
│   │
│   └── admin_service/
│       ├── app.js
│       ├── server.js
│       ├── controllers/
│       │   └── admin.controller.js
│       └── routes/
│           └── admin.routes.js
│
├── utils/                       # Shared utilities
│   ├── constants.js            # Application constants (categories, etc.)
│   ├── error.js                # Error creation and JSON conversion
│   ├── error_codes.js          # Centralized error code definitions
│   ├── http.js                 # HTTP client utilities
│   ├── logs_client.js          # Logs service client
│   ├── request_logger.js       # Request logging middleware
│   └── validate.js             # Validation helper functions
│
├── tests/                       # Test files
│   ├── setup.js                # Test configuration
│   ├── users.test.js
│   ├── costs.test.js
│   ├── logs.test.js
│   └── admin.test.js
│
├── package.json                # Dependencies and scripts
├── jest.config.js              # Jest configuration
└── readme.md                   # This file
```

---

## 🧩 Services Architecture

| Service | Responsibility | Default Port | Main Endpoints |
|---------|---------------|-------------|----------------|
| **users-service** | User management, user details with cost totals | 3001 | `GET /api/users`, `GET /api/users/:id`, `POST /api/add` |
| **costs-service** | Add costs, generate monthly reports | 3002 | `POST /api/cost`, `GET /api/report` |
| **logs-service** | Central logs storage and retrieval | 3003 | `GET /api/logs`, `POST /internal/ingest` |
| **admin-service** | System info, developer team | 3004 | `GET /api/about` |

---

## 🚨 Error Codes

The system uses centralized error codes defined in `utils/error_codes.js`. All errors return a JSON response with an `id` (error code) and `message`.

### Error Code Ranges

- **1000-1099**: Validation / Input errors
- **1100-1199**: Users-related errors
- **1200-1299**: Costs/Reports errors
- **1300-1399**: Logs errors
- **1400-1499**: Admin errors
- **2000-2099**: Database (MongoDB) errors
- **5000**: Unknown/Internal errors



## 👥 Authors
- Shir Ganon
- Aviv Grinberg