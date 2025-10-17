// src/Table.jsx
import React from "react";

const TableHeader = () => (
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Job</th>
      <th>Actions</th>
    </tr>
  </thead>
);

const TableBody = ({ characterData, removeCharacter }) => (
  <tbody>
    {characterData.map((row, index) => (
      <tr key={row.id ?? index}>
        <td>{row._id}</td>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
);

export default function Table({ characterData, removeCharacter }) {
  return (
    <table className="table">
      <TableHeader />
      <TableBody
        characterData={characterData}
        removeCharacter={removeCharacter}
      />
    </table>
  );
}