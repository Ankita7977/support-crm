# Support CRM System

A full-stack Customer Support Ticketing CRM System built using FastAPI, SQLite, React, Bootstrap, and Axios.

## Live Demo

Frontend URL:
https://support-crm-cyan.vercel.app

Backend URL:
support-crm-production-323c.up.railway.app

---

## Features

### Ticket Management

* Create Support Tickets
* Auto-generated Ticket ID (TKT-001, TKT-002, etc.)
* Customer Name & Email
* Subject & Description
* Created Timestamp

### Ticket Listing

* View all tickets
* Latest tickets displayed first
* Ticket Status Badge

### Search Functionality

Search tickets by:

* Ticket ID
* Customer Name
* Customer Email
* Subject
* Description

### Status Filtering

Filter tickets by:

* Open
* In Progress
* Closed

### Ticket Details

* View complete ticket information
* View creation date
* View last updated date
* View notes/comments

### Ticket Updates

* Change ticket status
* Add notes/comments
* Automatically update timestamp

---

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

### Frontend

* React
* React Router DOM
* Axios
* Bootstrap

### Database

* SQLite

### Deployment

* Railway (Backend)
* Vercel (Frontend)

---

## Project Structure

support-crm/

backend/

* main.py
* database.py
* models.py
* schemas.py
* requirements.txt
* crm.db

frontend/

* src/

  * pages/

    * Home.jsx
    * CreateTicket.jsx
    * TicketDetail.jsx
  * services/

    * api.js

---

## API Endpoints

### Create Ticket

POST /api/tickets

Request Body:

{
"customer_name": "John",
"customer_email": "[john@example.com](mailto:john@example.com)",
"subject": "Login Issue",
"description": "Unable to login"
}

---

### Get All Tickets

GET /api/tickets

Query Parameters:

* search
* status

Example:

/api/tickets?status=Open

---

### Get Single Ticket

GET /api/tickets/{ticket_id}

Example:

/api/tickets/TKT-001

---

### Update Ticket

PUT /api/tickets/{ticket_id}

Request Body:

{
"status": "Closed",
"notes": "Issue resolved"
}

---

## Local Setup

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

http://localhost:8000

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

http://localhost:5173

---

## Future Improvements

* User Authentication
* Admin Dashboard
* Ticket Priority Levels
* Ticket Assignment
* Email Notifications
* Pagination
* Export Tickets to Excel/PDF

---

## Author

Ankita Prajapati

GitHub:
https://github.com/Ankita7977

---

## Assignment Submission

This project was developed as part of the Datastraw Technologies Full Stack Developer Assessment.
