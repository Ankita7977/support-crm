import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const loadTickets = async () => {
    try {
      const response = await API.get(
        "/api/tickets",
        {
          params: {
            search,
            status,
          },
        }
      );

      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [search, status]);

  const openCount = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progressCount = tickets.filter(
    (ticket) =>
      ticket.status === "In Progress"
  ).length;

  const closedCount = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1>Support CRM</h1>

        <Link
          to="/create"
          className="btn btn-primary"
        >
          Create Ticket
        </Link>

      </div>

      {/* Dashboard */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Total</h5>
            <h3>{tickets.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Open</h5>
            <h3>{openCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>In Progress</h5>
            <h3>{progressCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Closed</h5>
            <h3>{closedCount}</h3>
          </div>
        </div>

      </div>

      {/* Search */}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Customer Name"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Status Filter */}

      <div className="mb-4">
        <select
          className="form-select"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

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

      {/* Ticket List */}

      {tickets.length === 0 ? (
        <div className="alert alert-info">
          No tickets found
        </div>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.ticket_id}
            className="card p-3 mb-3 shadow-sm"
          >
            <h5>
              {ticket.ticket_id}
            </h5>

            <p>
              <strong>Name:</strong>{" "}
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
              <strong>Created:</strong>{" "}
              {ticket.created_at
                ? new Date(
                    ticket.created_at
                  ).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}

              <span
                className={
                  ticket.status === "Closed"
                    ? "badge bg-danger"
                    : ticket.status ===
                      "In Progress"
                    ? "badge bg-warning text-dark"
                    : "badge bg-success"
                }
              >
                {ticket.status}
              </span>
            </p>

            <Link
              to={`/ticket/${ticket.ticket_id}`}
              className="btn btn-outline-primary"
            >
              View Details
            </Link>

          </div>
        ))
      )}

    </div>
  );
}

export default Home;