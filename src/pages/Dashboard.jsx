import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";

function Dashboard() {
    const firstName =
  localStorage.getItem("firstName");
  const navigate = useNavigate();
  const [stats, setStats] = useState({
  totalBookings: 0,
  totalItineraries: 0,
});
const [recentBookings, setRecentBookings] =
  useState([]);
const [recentItineraries, setRecentItineraries] =
  useState([]);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("firstName");

  navigate("/");
};

  const generateShareLink = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/itinerary/${id}/share-link`
    );

    console.log(res.data.shareUrl);

    navigator.clipboard.writeText(
      res.data.shareUrl
    );

    alert("Link copied!");
  } catch (err) {
    console.log(err);
  }
};

const fetchStats = async () => {
  try {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/dashboard-stats/${userId}`
    );

    console.log(res.data);

    setStats(res.data.stats);
  } catch (err) {
    console.log(err);
  }
};

const fetchRecentItineraries = async () => {
  try {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/recent-itineraries/${userId}`
    );

    setRecentItineraries(
      res.data.itineraries
    );
  } catch (err) {
    console.log(err);
  }
};

const fetchRecentBookings = async () => {
  try {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/recent-bookings/${userId}`
    );

    setRecentBookings(res.data.bookings);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchStats();
  fetchRecentItineraries();
  fetchRecentBookings();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
  {firstName?.charAt(0)}
</div>
    <h1 className="text-3xl font-bold text-center">
  Welcome Back, {firstName} 👋
</h1>

<p className="text-center text-gray-500 mb-8">
  Manage your travel documents and itineraries
</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Upload Document
          </button>

          <button
  onClick={() => navigate("/itineraries")}
  className="bg-purple-500 text-white px-4 py-2 rounded"
>
  My Itineraries
</button>
<button
  onClick={generateShareLink}
  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
>
  Generate Share Link
</button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <div className="grid grid-cols-2 gap-4 mt-6">
  <div className="bg-blue-500 text-white p-6 rounded-lg">
    <h2 className="text-xl font-bold">
      Total Uploads
    </h2>

    <p className="text-3xl mt-2">
      {stats.totalBookings}
    </p>
  </div>

  <div className="bg-green-500 text-white p-6 rounded-lg">
    <h2 className="text-xl font-bold">
      Total Itineraries
    </h2>

    <p className="text-3xl mt-2">
      {stats.totalItineraries}
    </p>
  </div>
</div>
<div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Recent Activity
  </h2>

  {recentItineraries.length === 0 ? (
    <div className="bg-gray-100 p-4 rounded-lg">
      No itineraries found
    </div>
  ) : (
    <div className="space-y-4">
      {recentItineraries.map((item) => (
        <div
          key={item._id}
          className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">
                Travel Itinerary
              </p>

              <p className="text-gray-500 text-sm">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() =>
                navigate(`/itinerary/${item._id}`)
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
<div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Recent Uploads
  </h2>

  {recentBookings.length === 0 ? (
    <div className="bg-gray-100 p-4 rounded-lg">
      No uploads found
    </div>
  ) : (
    <div className="space-y-3">
      {recentBookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white border rounded-xl p-4 shadow-sm"
        >
          <p className="font-semibold">
            {booking.fileName}
          </p>

          <p className="text-gray-500 text-sm">
            {new Date(
              booking.createdAt
            ).toLocaleString()}
          </p>

          <p className="text-blue-500 text-sm mt-1">
            {booking.documentType}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;