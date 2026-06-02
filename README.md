# Support CRM System

A full-stack Customer Support Ticketing CRM System built using FastAPI, SQLite, React, Bootstrap, and Axios.

---

# Live Demo

### Frontend (Vercel)

https://support-crm-cyan.vercel.app/

### Backend API (Render)

https://support-crm-chsp.onrender.com/

### API Documentation (Swagger)

https://support-crm-chsp.onrender.com/docs

### GitHub Repository

https://github.com/Ankita7977/support-crm

---

# Features

## Ticket Management

- Create Support Tickets
- Auto-generated Ticket IDs (TKT-001, TKT-002, etc.)
- Customer Name & Email
- Issue Subject & Description
- Automatic Timestamp Generation

## Ticket Listing

- View all support tickets
- Latest tickets displayed first
- Status indicators using badges

## Search Functionality

Search tickets by:

- Ticket ID
- Customer Name
- Customer Email
- Subject
- Description

## Status Filtering

Filter tickets by:

- Open
- In Progress
- Closed

## Ticket Details

- View complete ticket information
- Customer details
- Ticket description
- Creation timestamp
- Last updated timestamp
- Notes and comments

## Ticket Updates

- Change ticket status
- Add notes/comments
- Automatic update timestamp

## Dashboard Statistics

- Total Tickets
- Open Tickets
- In Progress Tickets
- Closed Tickets

---

# Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

## Frontend

- React
- React Router DOM
- Axios
- Bootstrap

## Database

- SQLite

## Deployment

- Render (Backend)
- Vercel (Frontend)

---

# Project Structure

```text
support-crm/

├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── crm.db
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateTicket.jsx
│   │   │   └── TicketDetail.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# API Endpoints

## Create Ticket

### POST

```http
POST /api/tickets
```

Request Body:

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Login Issue",
  "description": "Unable to login to account"
}
```

Response:

```json
{
  "ticket_id": "TKT-001",
  "created_at": "2026-06-02T12:00:00"
}
```

---

## Get All Tickets

### GET

```http
GET /api/tickets
```

Optional Query Parameters:

```http
/api/tickets?status=Open

/api/tickets?search=john
```

---

## Get Single Ticket

### GET

```http
GET /api/tickets/{ticket_id}
```

Example:

```http
/api/tickets/TKT-001
```

---

## Update Ticket

### PUT

```http
PUT /api/tickets/{ticket_id}
```

Request Body:

```json
{
  "status": "Closed",
  "notes": "Issue resolved successfully"
}
```

Response:

```json
{
  "success": true,
  "updated_at": "2026-06-02T12:15:00"
}
```

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/Ankita7977/support-crm.git

cd support-crm
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Assignment Requirements Covered

- ✅ Create Tickets
- ✅ List All Tickets
- ✅ Search Tickets
- ✅ Filter by Status
- ✅ View Ticket Details
- ✅ Update Ticket Status
- ✅ Add Notes/Comments
- ✅ Dashboard Statistics
- ✅ FastAPI REST API
- ✅ SQLite Database
- ✅ React Frontend
- ✅ Production Deployment
- ✅ GitHub Repository

---

# Future Improvements

- User Authentication
- Role-Based Access Control
- Ticket Priority Levels
- Ticket Assignment System
- Email Notifications
- Pagination
- Export to Excel/PDF
- Analytics Dashboard

---

# Author

### Ankita Prajapati

GitHub Profile:

https://github.com/Ankita7977

---

# Assignment Information

This project was developed as part of the Datastraw Technologies Full Stack Developer Assessment.

The application demonstrates full-stack development skills including database design, REST API development, frontend implementation, deployment, and end-to-end integration.
