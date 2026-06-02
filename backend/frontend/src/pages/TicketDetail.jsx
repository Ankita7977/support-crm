import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function TicketDetail() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    try {
      const response = await API.get(
        `/api/tickets/${ticketId}`
      );

      setTicket(response.data);

      setStatus(
        response.data.status || "Open"
      );

      setNotes(
        response.data.notes || ""
      );
    } catch (error) {
      console.error(error);
      alert("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async () => {
    try {
      await API.put(
        `/api/tickets/${ticketId}`,
        {
          status,
          notes,
        }
      );

      alert(
        "Ticket Updated Successfully"
      );

      loadTicket();
    } catch (error) {
      console.error(error);
      alert("Failed to update ticket");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Ticket not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h2>{ticket.ticket_id}</h2>

          <span
            className={
              ticket.status === "Closed"
                ? "badge bg-danger"
                : ticket.status === "In Progress"
                ? "badge bg-warning text-dark"
                : "badge bg-success"
            }
          >
            {ticket.status}
          </span>

        </div>

        <hr />

        <p>
          <strong>Customer Name:</strong>{" "}
          {ticket.customer_name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {ticket.customer_email}
        </p>

        <p>
          <strong>Subject:</strong>{" "}
          {ticket.subject}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {ticket.description}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {ticket.created_at
            ? new Date(
                ticket.created_at
              ).toLocaleString()
            : "N/A"}
        </p>

        <p>
          <strong>Last Updated:</strong>{" "}
          {ticket.updated_at
            ? new Date(
                ticket.updated_at
              ).toLocaleString()
            : "N/A"}
        </p>

        <hr />

        <div className="mb-3">

          <label className="form-label">
            Status
          </label>

          <select
            className="form-select"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="Open">
              Open
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Closed">
              Closed
            </option>
          </select>

        </div>

        <div className="mb-3">

          <label className="form-label">
            Notes
          </label>

          <textarea
            rows="5"
            className="form-control"
            placeholder="Add notes here..."
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

        </div>

        <div className="d-flex gap-2">

          <button
            className="btn btn-success"
            onClick={updateTicket}
          >
            Update Ticket
          </button>

          <Link
            to="/"
            className="btn btn-secondary"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default TicketDetail;