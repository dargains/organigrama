import React from "react";

const PersonCard = ({
  name,
  age,
  job,
}: {
  name: string;
  age: number;
  job: string;
}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Job: {job}</p>
    </div>
  );
};

export default PersonCard;
