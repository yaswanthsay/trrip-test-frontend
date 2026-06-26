import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SharedItinerary() {
  const { shareId } = useParams();

  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    fetchSharedItinerary();
  }, []);

  const fetchSharedItinerary = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/share/${shareId}`
    );

    setItinerary(res.data.itinerary);
  };

  if (!itinerary) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shared Travel Itinerary
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <pre className="whitespace-pre-wrap">
          {itinerary.itinerary}
        </pre>
      </div>
    </div>
  );
}

export default SharedItinerary;