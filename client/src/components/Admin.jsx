import React, { useEffect, useState } from "react";

const Admin = () => {
  const [places, setPlaces] = useState([]);

  // Fetch all places
  const fetchPlaces = () => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // Delete place
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this place?")) return;

    try {
      await fetch(`http://localhost:5000/reports/${id}`, { method: "DELETE" });
      fetchPlaces(); // refresh after delete
    } catch (err) {
      console.error(err);
      alert("Error deleting place!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>
      {places.length === 0 && <p className="text-center">No submissions yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {places.map((place) => (
          <div key={place.id} className="border rounded-xl p-4 shadow hover:shadow-2xl transition duration-300 bg-white">
            <h3 className="font-bold text-xl mb-1">{place.name}</h3>
            <p className="text-sm mb-1"><strong>Category:</strong> {place.category}</p>
            <p className="text-sm mb-1"><strong>Location:</strong> {place.location}</p>
            <p className="text-sm mb-2">{place.description}</p>
            {place.image && (
              <img
                src={`http://localhost:5000/uploads/${place.image}`}
                alt={place.name}
                className="w-full h-44 object-cover rounded mb-3"
              />
            )}
            <button
              onClick={() => handleDelete(place.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;