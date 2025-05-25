'use client';
import NotesPage from "@/components/NotesPage";
import AddNotesDialog from "@/components/AddNotesDialog";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Notes() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [username, setUsername] = useState('');


    const addNotes = (note) => {
        setNotes([...notes, note])
    }

    useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('http://localhost:5000/get_notes', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();
        if (res.ok) {
          setNotes(data.notes);
        } else {
          setError(data.error || 'Failed to fetch notes');
        }
      } catch (err) {
        setError('Error fetching notes');
        console.error(err);
      }
    };
    

    fetchNotes();

     const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/get_user', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setUsername(data.username);  // assuming API returns { username: "John" }
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);
  

    console.log("ALL user Notes", notes)
    return (
        <>
            <div className="notes-container">
                <h3>Good Morning {username ? username : ''}</h3>
                <button className="floating-button" onClick={() => setOpen(true)}>
                    +
                </button>

                <AddNotesDialog addNotes={addNotes} open={open} onClose={() => setOpen(false)} />

                <NotesPage allNote={notes} />

            </div>
        </>
    )
}
