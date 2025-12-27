import React from "react";

const PlaceCard = ({ place, onLike, onDelete }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-xl font-bold">{place.name}</h2>
      <p className="text-sm">{place.category} - {place.location}</p>
      <p>{place.description}</p>
      {place.images && place.images.map((img, i) => (
        <img key={i} src={`http://localhost:5000/${img}`} className="w-32 h-32 object-cover mt-2"/>
      ))}
      <div className="mt-2 flex gap-2">
        <button onClick={onLike} className="bg-blue-500 text-white px-2 py-1 rounded">
          Like ({place.likes})
        </button>
        {onDelete && <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>}
      </div>
    </div>
  );
};

export default PlaceCard;