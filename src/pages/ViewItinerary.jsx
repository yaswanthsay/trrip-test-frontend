import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
  import { jsPDF } from "jspdf";


function ViewItinerary() {
  const { id } = useParams();

  const [itinerary, setItinerary] = useState(null);
  const [shareUrl, setShareUrl] = useState("");


  useEffect(() => {
    fetchItinerary();
  }, []);

  const fetchItinerary = async () => {
    const res = await axios.get(
      `http://localhost:3000/itinerary-details/${id}`
    );

    setItinerary(res.data.itinerary);
  };

  if (!itinerary) {
    return <h1>Loading...</h1>;
  }

  const generateShareLink = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/itinerary/${id}/share-link`
    );

    setShareUrl(res.data.shareUrl);
  } catch (err) {
    console.log(err);
  }
};

const downloadPdf = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Travel Itinerary", 20, 20);

  doc.setFontSize(12);

  const lines = doc.splitTextToSize(
    itinerary.itinerary,
    170
  );

  doc.text(lines, 20, 40);

  doc.save("itinerary.pdf");
};

 return (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">
      Travel Itinerary
    </h1>

    <div className="bg-white shadow rounded-lg p-6">
      <pre className="whitespace-pre-wrap">
        {itinerary.itinerary}
      </pre>
    </div>

    <button
      onClick={generateShareLink}
      className="bg-green-500 text-white px-4 py-2 rounded mt-4"
    >
      Generate Share Link
    </button>

   {shareUrl && (
  <div className="mt-4">
    <input
      value={shareUrl}
      readOnly
      className="border p-2 w-full"
    />

    <button
      onClick={() => {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied!");
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
    >
      Copy Link
    </button>
    <button
  onClick={downloadPdf}
  className="bg-green-500 text-white px-4 py-2 rounded"
>
  Download PDF
</button>
  </div>
)}
  </div>
);
}
export default ViewItinerary