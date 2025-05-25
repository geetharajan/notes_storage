'use client';

import React, { useState, useEffect } from 'react';
import '../styles/notes.css';

const EditNotesDialog = ({ open, onClose, note, onSave, onDelete }) => {
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (note) {
      setEditedContent(note.content);
    }
  }, [note]);

  const handleUpdate = async () => {
    const updatedNote = {
      ...note,
      title: note.title,
      content: editedContent,
      lastModified: new Date().toLocaleString(),
    };
    try {
      const response = await fetch(`http://localhost:5000/update_note/${note.note_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedNote),
      });
      const responseData = await response.json();
      console.log('Response:', responseData);
      if (response.ok) {
        alert("Note updated successfully");
        onSave(updatedNote);
        onClose();
      } else {
        alert("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };


  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/delete_note/${note.note_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        alert("Note deleted successfully");
        onDelete(note.note_id);
        onClose();
      } else {
        alert("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("An error occurred while deleting the note");
    }
  };


  if (!open || !note) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{note.title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div style={{ padding: "10px" }}>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={8}
          />
        </div>
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
          <button
            style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '8px 12px', borderRadius: '4px' }}
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', borderRadius: '4px' }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNotesDialog;
