import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const loadTickets = async () => {
    try {
      const response = await API.get("/api/tickets", {
        params: {
          search,
          status,
        },
      });

      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [search, status]);

  const totalCount = tickets.length;

  const openCount = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progressCount = tickets.filter(
    (ticket) => ticket.status === "In Progress"
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
          <div className="card shadow-sm text-center p-3">
            <h6>Total Tickets</h6>
            <h3>{totalCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6>Open</h6>
            <h3>{openCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6>In Progress</h6>
            <h3>{progressCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6>Closed</h6>
            <h3>{closedCount}</h3>
          </div>
        </div>

      </div>

      {/* Search */}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name, Email, Ticket ID, Subject"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Filter */}

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
            className="card shadow-sm p-3 mb-3"
          >
            <div className="row">

              <div className="col-md-9">

                <h5>
                  {ticket.ticket_id}
                </h5>

                <p className="mb-1">
                  <strong>Name:</strong>{" "}
                  {ticket.customer_name}
                </p>

                <p className="mb-1">
                  <strong>Email:</strong>{" "}
                  {ticket.customer_email}
                </p>

                <p className="mb-1">
                  <strong>Subject:</strong>{" "}
                  {ticket.subject}
                </p>

                <p className="mb-1">
                  <strong>Created:</strong>{" "}
                  {ticket.created_at
                    ? new Date(
                        ticket.created_at
                      ).toLocaleString()
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

              </div>

              <div className="col-md-3 d-flex align-items-center">
                <Link
                  to={`/ticket/${ticket.ticket_id}`}
                  className="btn btn-outline-primary w-100"
                >
                  View Details
                </Link>
              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
