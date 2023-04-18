import { useState } from "react";

function App() {
  const [popup, setPopup] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [diedDate, setDiedDate] = useState(""); 

  const handleClick = () => {
    setPopup(!popup);
  };

  return (
    <div id="container">
      <div class = "navbar">

      <h1 class = "title">The Last Show</h1>

      <button class="popup" onClick={handleClick}>
        + New Obituary
      </button>
     
      </div>

      {popup && (
        <div id="popup-container">
          <div class="popup-content">
          <h3>Create a New Obituary </h3>
          <img src={require("./header.png")} alt="logo" />



          <button>Select an image for the deceased</button>
          <input id="name-box" type="text" placeholder="Name of the deceased " ></input>
          <div className="date">
            <p>Born:</p>
            <input type="date"
            placeholder="Date of birth"
            value={birthDate}
            onChange={(event)=> setBirthDate(event.target.value)}
            ></input>

            <p>Died:</p>
            <input type="date"
            placeholder="Date of death"
            value={diedDate}
            onChange={(event)=> setDiedDate(event.target.value)}
            ></input>
  

           </div> 

          
          <button id="write-button">Write Obituary</button> 


          <button class="close-popup" onClick={handleClick}>X</button>
          </div>
        </div>
      )}

       <h2 id="empty">No Obituary Yet.</h2>
    
    </div>
  );
}

export default App;
