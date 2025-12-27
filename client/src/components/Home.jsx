import React, { useEffect, useState } from "react";

const Home = ({ admin }) => {
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState(""); // for category filter

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Hidden Gems",
    "Nightlife",
    "Cultural",
    "Entertainment",
    "Adventure / Outdoors",
    "Wellness",
    "Events"
  ];

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

  const handleLike = async (id) => {
    try {
      await fetch(`http://localhost:5000/reports/${id}/like`, { method: "POST" });
      fetchPlaces();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered places
  const filteredPlaces = filter ? places.filter(p => p.category === filter) : places;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Local Places</h2>

      {/* Filter Dropdown */}
      <div className="mb-6 flex justify-center gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        {filter && (
          <button
            onClick={() => setFilter("")}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          >
            Clear
          </button>
        )}
      </div>

      {filteredPlaces.length === 0 && (
        <p className="text-center">No places found for this category.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlaces.map((place) => (
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLike(place.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full transition transform hover:scale-105"
              >
                Like
              </button>
              <span>{place.likes || 0} Likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;