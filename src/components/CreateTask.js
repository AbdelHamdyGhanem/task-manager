import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css'; // Ensure this path matches your project structure

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [progress, setProgress] = useState('Not Started');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the due date is valid
    const selectedDate = new Date(dueDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Remove the time part for accurate comparison

    if (selectedDate < currentDate) {
      setError('Due date cannot be in the past.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    try {
      const taskData = {
        taskName,
        progress,
        description,
        dueDate,
        priority,
        createdAt: new Date().toISOString(),
      };

      console.log('Task data:', taskData);

      const docRef = await addDoc(collection(db, 'tasks'), taskData);
      console.log('Task added with ID:', docRef.id);

      // Clear the form
      setTaskName('');
      setProgress('Not Started');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      setError('');

      // Navigate to home to see the updated tasks list
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDueDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Remove the time part for accurate comparison

    if (selectedDate < currentDate) {
      setError('Due date cannot be in the past.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } else {
      setError('');
      setShowError(false);
      setDueDate(e.target.value);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Create Task</h2>
        {showError && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Progress on Completion:</label>
            <select value={progress} onChange={(e) => setProgress(e.target.value)} required>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input type="date" value={dueDate} onChange={handleDueDateChange} required />
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;