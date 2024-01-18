import React, { useState, useContext } from "react";
import "./addPopup.css";
import Picker from "emoji-picker-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';


const Popup = (props) => {
  const [habitName, setHabitName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newHabit, setNewHabit] = useState({});
  const navigate = useNavigate();

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

    const addHabit = async (event) => {
      event.preventDefault();
      const newHabitData = { habitName, emoji: selectedEmoji };
  
      try {
        const { data } = await axios.post('/add-habit', newHabitData);
  
        if (data.error) {
          toast.error(data.error);
        } else {
          setNewHabit({}); // Reset the state after successful addition
          console.log('Habit added successfully:', data);
          toast.success('Habit added successfully');
          props.handleClose();
        }
      } catch (error) {
        toast.error('Error adding habit');
        console.error('Error adding habit:', error.response?.data || error.message);
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
