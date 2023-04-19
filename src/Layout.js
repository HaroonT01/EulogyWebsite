import React, { useState, useEffect } from 'react';
import Empty from './Empty';
import './Layout.css';
import Popup from './Popup';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from '@cloudinary/react';

import {CloudinaryImage} from '@cloudinary/url-gen';

const Layout = () => {
  const currentDate = new Date().toISOString().slice(0, 16);
  const [showPopup, setShowPopup] = useState(false);
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [menuVisible, setMenuVisible] = useState(false);
  const myImage = new CloudinaryImage('sample', {cloudName: 'dnykszhhp'}).resize(fill().width(100).height(150));

  const handleAddButtonClick = () => {
    document.querySelector("body").style.overflow = "hidden";
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    document.querySelector("body").style.overflow = "auto";
    setShowPopup(false);
  };

  const addNote = (newNote) => {
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const updateNote = (id, title) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, title };
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const showMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'long' });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  
  return (
    <div>
      <header>
        <aside>&nbsp;</aside>
  
        <div id="app-header">
          <h1>
          The Last Show
          </h1>
        </div>
  
        <aside>
          <button className="add-note-btn" onClick={handleAddButtonClick}>+ New Obiturary</button>
        </aside>
      </header>
      <hr />
      {notes.length === 0 && <Empty />}
      {showPopup && <Popup onClose={handlePopupClose} onSubmit={addNote} />}
      <div className="notes">
        {notes.map(note => (
          <div key={note.id} className="note">
         <img src={note.image} alt={note.title} className="note-image" />
         <h3 className="note-title">{note.title}</h3>
    <p className="note-dates">{formatDate(note.born)} - {formatDate(note.died)}</p>
    <div className="bottom-content">
              <div className="settings">
                <i onClick={showMenu} className="uil uil-ellipsis-h"></i>
                <ul className={`menu ${menuVisible ? 'visible' : ''}`}>
                  <li onClick={() => updateNote(note.id, note.title)}><i className="uil uil-pen"></i>Edit</li>
                  <li onClick={() => deleteNote(note.id)}><i className="uil uil-trash"></i>Delete</li>
                </ul>
              </div>
              <button className="delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
        <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  
      </div>
    </div>
  );
};

export default Layout;
