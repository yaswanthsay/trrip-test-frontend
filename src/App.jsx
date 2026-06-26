import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadDocument from "./pages/UploadDocument";
import MyItineraries from "./pages/MyItineraries";
import ViewItinerary from "./pages/ViewItinerary";
import SharedItinerary from "./pages/SharedItinerary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
         path="/upload"
         element={
        <ProtectedRoute>
        <UploadDocument />
       </ProtectedRoute>
  }
/>

<Route
  path="/itineraries"
  element={<MyItineraries />}
/>
<Route
  path="/itinerary/:id"
  element={<ViewItinerary />}
/>
<Route
  path="/share/:shareId"
  element={<SharedItinerary />}
/>

<Route
  path="/my-itineraries"
  element={<MyItineraries />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;