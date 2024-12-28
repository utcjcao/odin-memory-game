import React from "react";

function Card({ imageUrl, id }) {
  return (
    <div id={id} className="card">
      <img src={imageUrl} alt="pic" />
    </div>
  );
}

export default Card;
