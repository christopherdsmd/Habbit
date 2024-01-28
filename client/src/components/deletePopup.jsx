import React, { useEffect, useState } from 'react';
import "./deletePopup.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const DeletePopup = ({ userID, setDeletePopupOpen }) => {
    const [habits, setHabits] = useState([]);

    const fetchHabits = async () => {
        try {
            const response = await axios.get('/habits');
            setHabits(response.data);
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, [userID]);

    const deleteHabit = async (habitId) => {
        try {
            const { data } = await axios.delete(`/delete-habit/${habitId}/${userID}`);
            fetchHabits();
    
            if (data.error) {
                toast.error(data.error);
            } else {
                // Assuming you passed setHabits as a prop to DeletePopup
                setHabits(data.user.habits);
    
                console.log("Habit deleted successfully:", data);
                toast.success("Habit deleted successfully");
                props.handleClose();
            }
        } catch (error) {
            // Handle errors
            toast.error("Error deleting habit");
            console.error("Error deleting habit:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="overlay">
            <div className="modal">
                <button className="btn-close" onClick={() => setDeletePopupOpen(false)}>
                    x
                </button>
                {habits.map((habit) => (
                    <div key={habit._id} className="habit-entry">
                        <button className="delete-btn" onClick={() => deleteHabit(habit._id)}>
                            Delete
                        </button>
                        <div className="habit-name">
                            {habit.habit_name} {habit.emoji}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeletePopup;
