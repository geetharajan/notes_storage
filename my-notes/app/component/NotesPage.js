'use client';

import React, { useEffect, useState } from 'react';
import '../styles/notes.css';
import EditNotesDialog from './EditNotesDialog';

const NotesPage = ({allNote}) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [notes, setNotes] = useState([]);


useEffect(() => {
    if (allNote) {
      setNotes(allNote);
    }
  }, [allNote]);    

  return (
    <>
      <div className="notes-grid">
          {notes.map((note, idx) => (
              <div key={idx} className="note-wrapper">
                  <div className="note-card"  onClick={() => {setSelectedNote(note); setEditDialogOpen(true);}}>
                      <div className="note-header">
                          <strong>{note.title}</strong>
                      </div>
                      <div className="note-content">
                          <p>{note.content}</p>
                      </div>
                      <div className="note-footer">
                          <span>Last Modified: {note.lastModified}</span>
                      </div>
                  </div>
              </div>
          ))}
      </div>
      {isEditDialogOpen && 

        <EditNotesDialog
        open={isEditDialogOpen}
        note={selectedNote}
        onClose={() => setEditDialogOpen(false)}
        onSave={(updatedNote) => {
        setNotes(prev =>
            prev.map(n => n.note_id === updatedNote.note_id ? updatedNote : n)
        );
        }}
        onDelete={(id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.note_id !== id));
        }}
        />
        }
    </>
  );

};
export default NotesPage;