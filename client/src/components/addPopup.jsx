import React, { useState } from "react";
import "./addPopup.css";
import Picker from "emoji-picker-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Popup = (props) => {
  const [habitName, setHabitName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

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

  const addHabit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Making request to add habit:', { habitName, emoji: selectedEmoji });
      const response = await axios.post('/add-habit', { habitName, emoji: selectedEmoji });

      
      console.log('Response from add habit:', response);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Habit Added Successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="popup-box">
      <div className="box">
        <button className="btn-close" onClick={props.handleClose}>
          x
        </button>
        <form onSubmit={addHabit}>
          <label>
          
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
