import React, { useState } from 'react';

// Main MacroComplianceTracker component
const MacroComplianceTracker = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activity: '' // Activity level will be stored as a string
  });

  // State to store the saved list of data
  const [savedList, setSavedList] = useState([]);

  // Handle input change for each field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Calculate compliance percentage based on the filled fields
  const calculateCompliancePercentage = () => {
    const totalFields = 5; // There are 5 fields
    let filledFields = 0;

    // Count how many fields are filled
    for (const key in formData) {
      if (formData[key]) filledFields++;
    }

    // Calculate percentage: (filled fields / total fields) * 100
    return (filledFields / totalFields) * 100;
  };

  // Handle save action when the form is filled
  const handleSave = () => {
    const { age, gender, height, weight, activity } = formData;

    // Check if any field is empty
    if (!age || !gender || !height || !weight || !activity) {
      alert('Please fill in all fields before saving.');
      return;
    }

    // Calculate the compliance percentage
    const compliancePercentage = calculateCompliancePercentage();

    // Add the form data along with compliance percentage to the saved list
    setSavedList([
      ...savedList,
      { ...formData, compliancePercentage }
    ]);

    // Clear the form data after saving
    setFormData({
      age: '',
      gender: '',
      height: '',
      weight: '',
      activity: ''
    });
  };

  // Handle removal of a saved entry from the saved list
  const handleRemove = (index) => {
    const newList = savedList.filter((_, idx) => idx !== index);
    setSavedList(newList);
  };

  return (
    <div className="tracker-container">
      <h1>Macro Compliance Tracker</h1>

      {/* Form for user input */}
      <div className="form-container">
        <div>
          <label>Age: </label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleInputChange} 
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label>Gender: </label>
       <select
       name='gender'
       value={formData.gender}
       onChange={handleInputChange}
       >
        <option value="">select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        </select>     
      
        </div>

        <div>
          <label>Height (cm): </label>
          <input 
            type="number" 
            name="height" 
            value={formData.height} 
            onChange={handleInputChange} 
            placeholder="Enter your height"
          />
        </div>

        <div>
          <label>Weight (kg): </label>
          <input 
            type="number" 
            name="weight" 
            value={formData.weight} 
            onChange={handleInputChange} 
            placeholder="Enter your weight"
          />
        </div>

        {/* Activity Level Dropdown */}
        <div>
          <label>Activity Level: </label>
          <select 
            name="activity" 
            value={formData.activity} 
            onChange={handleInputChange}
          >
            <option value="">Select your activity level</option>
            <option value="Sedentary">Sedentary (Little or no exercise)</option>
            <option value="Lightly active">Lightly active (Exercise 1-3 days/week)</option>
            <option value="Moderately active">Moderately active (Exercise 3-5 days/week)</option>
            <option value="Very active">Very active (Exercise 6-7 days/week)</option>
            <option value="Super active">Super active (Very hard exercise or physical job)</option>
          </select>
        </div>

        {/* Button to save the form data */}
        <button onClick={handleSave}>Save</button>
      </div>

      {/* Display saved list */}
      <h2>Saved Data</h2>
      {savedList.length > 0 ? (
        <ul>
          {savedList.map((item, index) => (
            <li key={index} className="saved-item">
              <div>
                <p><strong>Age:</strong> {item.age}</p>
                <p><strong>Gender:</strong> {item.gender}</p>
                <p><strong>Height:</strong> {item.height} cm</p>
                <p><strong>Weight:</strong> {item.weight} kg</p>
                <p><strong>Activity Level:</strong> {item.activity}</p>
                <p><strong>Compliance:</strong> {item.compliancePercentage}%</p>
                
                {/* Remove button for each saved entry */}
                <button onClick={() => handleRemove(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data saved yet.</p>
      )}
    </div>
  );
};

export default MacroComplianceTracker;
