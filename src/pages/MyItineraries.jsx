import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyItineraries() {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `http://localhost:3000/itineraries/${userId}`
    );

    setItineraries(res.data.itineraries);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Itineraries
      </h1>

      {itineraries.map((item) => (
        <div
          key={item._id}
          className="border rounded p-4 mb-4"
        >
          <p>
            Booking ID: {item.bookingId}
          </p>

          <p>
            Created:
            {" "}
            {new Date(
              item.createdAt
            ).toLocaleDateString()}
          </p>

          <Link
            to={`/itinerary/${item._id}`}
            className="text-blue-500"
          >
            View Itinerary
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyItineraries;