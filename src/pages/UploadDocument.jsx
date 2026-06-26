import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("flight");
  const [message, setMessage] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
  setError("");
  setFile(e.target.files[0]);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("document", file);
    formData.append(
      "userId",
      localStorage.getItem("userId")
    );
    formData.append("documentType", documentType);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload-booking`,
        formData
      );

      console.log(res.data);

      const bookingId = res.data.booking._id;

      setBookingId(res.data.booking._id);

    localStorage.setItem("bookingId", bookingId);

    setMessage("Document uploaded successfully!");   
    } catch (err) {
      console.log(err);
      setMessage("Upload failed");
    }
  };


  const generateItinerary = async () => {
  setError("");

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/itinerary/${bookingId}`
    );

    if (res.data.success) {
      setError("");

      alert("Itinerary generated successfully");

      navigate(
        `/itinerary/${res.data.itinerary._id}`
      );
    }
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Something went wrong"
    );

    console.log(err.response?.data);
  }
};




  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[450px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Upload Document
        </h1>

        <select
          value={documentType}
          onChange={(e) =>
            setDocumentType(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        >
          <option value="flight">Flight</option>
          <option value="hotel">Hotel</option>
          <option value="visa">Visa</option>
        </select>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="w-full border p-3 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded"
        >
          Upload
        </button>

        {error && (
  <p className="text-red-500 mt-2">
    {error}
  </p>
)}

       {bookingId && (
  <button
    type="button"
    onClick={generateItinerary}
    className="w-full bg-green-500 text-white py-3 rounded mt-4"
  >
    Generate Itinerary
  </button>
)}

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default UploadDocument;