'use client';

import React, { useState } from 'react';
import '../styles/notes.css';


const AddNotesDialog = ({ open, onClose, addNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [note, setNote] = useState([]);

 const handleNotes = async () => {
  if (title.trim() !== "" && content.trim() !== "") {
    const timeStamp = new Date().toLocaleString();
    
    const newNote = {
      title,
      content,
      lastModified: timeStamp,
      createdAt : timeStamp
    };

    try {
      const response = await fetch('http://localhost:5000/save_note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newNote)
      });

      const data = await response.json();

      if (response.ok) {
        addNotes(newNote)
        setTitle('');
        setContent('');
        onClose();          
        alert("Note saved successfully!");
      } else {
        alert(data.error || "Failed to save note.");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Something went wrong while saving the note.");
    }

  } else {
    alert('Note is empty!');
  }
};

  console.log("notes array", note)

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Add Notes</h3>
          <button className="close-btn" onClick={onClose}>x</button>
        </div>
        <div style={{padding:"10px"}}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
       <div style={{padding:"10px"}}>
       <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
       </div>
        <div className="modal-actions">
          <button className="add-btn" onClick={handleNotes}>Add</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddNotesDialog;
