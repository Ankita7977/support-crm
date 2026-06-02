from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from database import SessionLocal, engine
from models import Base, Ticket
from schemas import TicketCreate, TicketUpdate

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Home Route
@app.get("/")
def home():
    return {"message": "CRM Running Successfully"}


# Create Ticket
@app.post("/api/tickets")
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):
    count = db.query(Ticket).count() + 1

    ticket_code = f"TKT-{count:03}"

    new_ticket = Ticket(
        ticket_id=ticket_code,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket_id": new_ticket.ticket_id,
        "created_at": new_ticket.created_at
    }


# Get All Tickets
@app.get("/api/tickets")
def get_tickets(
    search: str = "",
    status: str = "",
    db: Session = Depends(get_db)
):
    query = db.query(Ticket)

    if search:
        query = query.filter(
            Ticket.customer_name.contains(search)
        )

    if status:
        query = query.filter(
            Ticket.status == status
        )

    return query.all()


# Get Single Ticket
@app.get("/api/tickets/{ticket_id}")
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


# Update Ticket
@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    data: TicketUpdate,
    db: Session = Depends(get_db)
):
    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    ticket.status = data.status
    ticket.notes = data.notes
    ticket.updated_at = datetime.utcnow()

    db.commit()

    return {
        "success": True,
        "updated_at": ticket.updated_at
    }