import React, { useState } from "react";

const AddPlace = () => {
  const [form, setForm] = useState({ name: "", category: "", location: "", description: "" });
  const [images, setImages] = useState([]);

  // Categories for dropdown
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    if (images.length > 0) formData.append("image", images[0]); // only first image for now

    try {
      const res = await fetch("http://localhost:5000/report", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      alert("Place added successfully!");

      setForm({ name: "", category: "", location: "", description: "" });
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Error adding place!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Place</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="file"
          onChange={(e) => setImages([...e.target.files])}
          className="mb-3"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold transition"
        >
          Add Place
        </button>
      </form>
    </div>
  );
};

export default AddPlace;