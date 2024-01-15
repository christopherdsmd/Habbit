import React, { useState } from "react";
import "./addPopup.css";
import Picker from "emoji-picker-react";
import axios from 'axios'

const Popup = (props) => {
  const [habitName, setHabitName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
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
              placeholder="Read, Exercise, Meditate..."
            />
          </label>
          <label>
            <input
              type="text"
              value={selectedEmoji}
              readOnly
              placeholder="😀"
            />
            <button type="button" onClick={handleEmojiButtonClick}>
              <img src="assets/smile_emoji.png" alt=":)" width="30" height="30" />
            </button>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
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
