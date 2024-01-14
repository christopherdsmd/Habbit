import React, { useState } from "react";
import { Picker } from "emoji-mart";
import data from "@emoji-mart/data";
import "./addPopup.css";

const Popup = (props) => {
  const [habitName, setHabitName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Habit Name:", habitName);
    console.log("Selected Emoji:", selectedEmoji);

    props.handleClose();
  };

  return (
    <div className="popup-box">
      <div className="box">
        <button className="btn-close" onClick={props.handleClose}>
          x
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Habit Name:
            <input
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />
          </label>
       <label>
    Select Emoji:
 
  </label>
          <button className="btn-add" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
