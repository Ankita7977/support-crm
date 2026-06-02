import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitTicket = async () => {
    // Validation
    if (
      !form.customer_name.trim() ||
      !form.customer_email.trim() ||
      !form.subject.trim() ||
      !form.description.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/api/tickets",
        {
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          subject: form.subject,
          description: form.description,
        }
      );

      alert(
        `Ticket Created Successfully!\nTicket ID: ${response.data.ticket_id}`
      );

      setForm({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      } else {
        alert("Failed to create ticket");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Create Support Ticket
        </h2>

        <div className="mb-3">
          <label className="form-label">
            Customer Name
          </label>

          <input
            type="text"
            name="customer_name"
            className="form-control"
            placeholder="Enter customer name"
            value={form.customer_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Customer Email
          </label>

          <input
            type="email"
            name="customer_email"
            className="form-control"
            placeholder="Enter customer email"
            value={form.customer_email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Enter ticket subject"
            value={form.subject}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            className="form-control"
            placeholder="Describe the issue"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={submitTicket}
          disabled={loading}
        >
          {loading
            ? "Creating Ticket..."
            : "Submit Ticket"}
        </button>

      </div>

    </div>
  );
}

export default CreateTicket;
