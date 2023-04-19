import React, { useState, useRef, useEffect } from 'react';

const Popup = ({ onClose, onSubmit }) => {
  const currentDate = new Date().toISOString().slice(0, 16);
  const [noteTitle, setNoteTitle] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [deathDate, setDeathDate] = useState(currentDate);
  const [image, setImage] = useState('');
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleNoteTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBirthDateChange = (event) => {
    setBirthDate((event.target.value));
  };

  const handleDiedDateChange = (event) => {
    setDeathDate(event.target.value);
  };


  const handleAddImageClick = () => {
    document.getElementById('fileUpload').click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNote = { id: Date.now(), title: noteTitle, born: birthDate, died: deathDate, image: image };
    onSubmit(newNote);
    onClose();
  };



  // const onSubmitWithClose = (note) => {
  //   onSubmit(note);
  //   onClose();
  // };

  return (
    <div className="popupBox">
      <button className="closeBtn" onClick={onClose}>X</button>
      <h2>Create a New Obituary</h2>
      
      <div>
      <form onSubmit={handleSubmit}/>
        <label htmlFor="fileUpload">
          <button className="add-image-button" onClick={handleAddImageClick} src="your-image-url.jpg" alt="Add image button" >Add image button</button>
        </label>
        <input id="fileUpload" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
      </div>
      <div className="input-wrapper">
        <input id="input-wrapper" type="text" value={noteTitle} onChange={handleNoteTitleChange} placeholder="Name of the deceased" ref={textInput} />
      </div>
      <div className="date-inputs">
        <div className="born-input">
          <p3 className="label-text">Born:</p3>
          <input type="datetime-local" 
           value={birthDate} 
           onChange={handleBirthDateChange} 
           className="date-time-input" 
           step="1"/>
        </div>
        <div className="died-input">
          <p3 className="label-text">Died:</p3>
          <input
            type="datetime-local"
            value={deathDate}
            onChange={handleDiedDateChange}
            className="date-time-input"
            step="1"
          />
        </div>
      </div>
      <button id="Cancel-button" onClick={onClose}>Cancel</button>
      <button id="write-obiturary" onClick={handleSubmit}>Write Obiturary</button>
      <button id="write-obiturary" onClick={handleSubmit}>Write Obiturary</button>
    </div>
  );
};

export default Popup;
