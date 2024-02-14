import React, { useState, useContext } from "react";
import "./addPopup.css";
import Picker from "emoji-picker-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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

  const addHabit = async (event) => {
    event.preventDefault();

    // Initialize daily_check array with 365 dates starting from '2024-01-01'
    const startDate = new Date("2024-01-01");
    const dailyCheck = Array.from({ length: 365 }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      return currentDate.toISOString().split("T")[0];
    });

    const newHabitData = {
      habitName,
      emoji: selectedEmoji,
      daily_check: dailyCheck.map((date) => ({ date, count: 0 })),
    };

    try {
      const { data } = await axios.post("/add-habit", newHabitData);

      if (data.error) {
        toast.error(data.error);
      } else {
        props.setHabits(data.user.habits);

        console.log("Habit added successfully:");
        toast.success("Habit added successfully");
        props.handleClose();
      }
    } catch (error) {
      toast.error("Error adding habit");
      console.error(
        "Error adding habit:",
        error.response?.data || error.message
      );
    }
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

 
  return (
    <div className="popup-overlay" onClick={props.handleClose}>
      <div className="popup" onClick={stopPropagation}>
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
              <img
                src="assets/smile_emoji.png"
                alt=":)"
                width="30"
                height="30"
              />
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
