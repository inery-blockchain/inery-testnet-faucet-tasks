import { useState, useEffect } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import Transaction from '../../blockchain';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inery = new Transaction();

function Notes() {
  //states
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note to the state array
  const saveHandler = () => {

    const notif_id = toast.loading("Saving, please wait...");
    const n_id = Date.now()

    setNotes((prevState) => [
      ...prevState,
      {
        id: n_id,
        note_body: inputText,
      }
    ]);
    //clear the textarea
    setInputText("");

    inery
    .transaction('createnote', {
      //author: 'erkinchi',
      note_id: n_id,
      note_body: inputText,
    })
    .then(res => {
      toast.update(notif_id, { render: "Note saved successfully.\n TX_ID:" + "\n" + res.transaction_id, type: "success", isLoading: false, autoClose: 3000 });
    })
    .catch(err => {
      toast.update(notif_id, { render: "Somthing went wrong!", type: "error", isLoading: false, autoClose: 3000 });
    });
  };

  //delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);

    const notif_id = toast.loading("Deleting, please wait...");

    inery
      .transaction('removenote', {
        note_id: id
      })
      .then(res => {
        toast.update(notif_id, { render: "Note deleted successfully.\n TX_ID:" + "\n" + res.transaction_id, type: "success", isLoading: false, autoClose: 3000 });

      })
      .catch(err => {
        toast.update(notif_id, { render: "Somthing went wrong!", type: "error", isLoading: false, autoClose: 3000 });
      });

  };

  //apply the save and get functions using useEffect
  //get the saved notes and add them to the array
  useEffect(() => {
    inery
      .getTableRows('notes')
      .then(data => {
        setNotes(data.rows);
      })
      .catch(e => {
      });
  }, []);

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.note_body}
          deleteNote={deleteNote}
        />
      ))}
      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />


      <ToastContainer />
    </div>
  );
}


export default Notes;
