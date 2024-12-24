import React, { useState } from 'react';

function App() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [result, setResult] = useState(null);
  const [description, setDescription] = useState('');
  const [weightSuggestion, setWeightSuggestion] = useState('');

  const handleCalculate = () => {
    if (!age || !weight || !feet || !inches) {
      alert("Please fill in all fields.");
      return;
    }

    if (age < 15 || age > 80) {
      alert("Age must be between 15 and 80.");
      return;
    }

    const heightInCm = (parseFloat(feet) * 30.48) + (parseFloat(inches) * 2.54);

    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * heightInCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * heightInCm) - (4.330 * age);
    }

    const tdee = bmr * parseFloat(activity);

    const maintenanceLoss = tdee - 50;
    const mildLoss = tdee - 250;
    const moderateLoss = tdee - 500;
    const extremeLoss = tdee - 750;
    
    const maintenanceLossPercentage = ((maintenanceLoss / tdee) * 100).toFixed(2);
    const mildLossPercentage = ((mildLoss / tdee) * 100).toFixed(2);
    const moderateLossPercentage = ((moderateLoss / tdee) * 100).toFixed(2);
    const extremeLossPercentage = ((extremeLoss / tdee) * 100).toFixed(2);

    setResult({
      maintenanceLoss,
      mildLoss,
      moderateLoss,
      extremeLoss,
      maintenanceLossPercentage,
      mildLossPercentage,
      moderateLossPercentage,
      extremeLossPercentage
    });

    const heightInMeters = heightInCm / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    if (bmi < 18.5) {
      setWeightSuggestion("You are underweight. It may be a good idea to consider gaining some weight for better health.");
    } else if (bmi >= 25) {
      setWeightSuggestion("You are overweight. It may be a good idea to consider losing some weight for better health.");
    } else {
      setWeightSuggestion("Your weight seems to be in a healthy range. Maintain your current lifestyle.");
    }
  };

  const handleClear = () => {
    setAge('');
    setWeight('');
    setFeet('');
    setInches('');
    setGender('');
    setActivity('1.2');
    setResult(null);
    setDescription('');
    setWeightSuggestion('');
  };

  return (
    <div className='App-container'>
      <h1>Modify the values and click the button</h1>
      {result && (
        <div className='results'>
          <div className='result-item'>
            <p>Maintenance Calories:</p>
            <p className='result-value'>{result.maintenanceLoss.toFixed(0)} Calories/day ({result.maintenanceLossPercentage}%)</p>
          </div>
          <div className='result-item'>
            <p>Mild Weight Loss (0.5 lb/week)</p>
            <p className='result-value'>{result.mildLoss.toFixed(0)} Calories/day ({result.mildLossPercentage}%)</p>
          </div>
          <div className='result-item'>
            <p>Moderate Weight Loss (1 lb/week)</p>
            <p className='result-value'>{result.moderateLoss.toFixed(0)} Calories/day ({result.moderateLossPercentage}%)</p>
          </div>
          <div className='result-item'>
            <p>Extreme Weight Loss (2 lb/week)</p>
            <p className='result-value'>{result.extremeLoss.toFixed(0)} Calories/day ({result.extremeLossPercentage}%)</p>
          </div>
        </div>
      )}
      {description && <div className='description'>{description}</div>}
      {weightSuggestion && <div className='weight-suggestion'>{weightSuggestion}</div>}

      <div className='input-container'>
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="15"
          max="80"
          className='input'
          style={{ width: '100px' }}
        />
        <label>ages 15-18</label>
      </div>
      <div className='input-container'>
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '200px' }} className='input'>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className='input-container'>
        <label>Height</label>
        <input
          type="number"
          value={feet}
          placeholder="feet"
          onChange={(e) => setFeet(e.target.value)}
          className='input'
          style={{ width: '100px' }}
        />
        <input
          type="number"
          value={inches}
          placeholder="inches"
          onChange={(e) => setInches(e.target.value)}
          className='input'
          style={{ width: '100px' }}
        />
      </div>
      <div className='input-container'>
        <label>Weight</label>
        <input
          type="number"
          value={weight}
          placeholder='kg'
          onChange={(e) => setWeight(e.target.value)}
          className='input'
        />
      </div>
      <div className='input-container'>
        <label>Activity</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value)} className='input'>
          <option value="1.2">Sedentary (little to no exercise)</option>
          <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
          <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
          <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
          <option value="1.9">Super active (very hard exercise, physical job)</option>
        </select>
      </div>

      <div className='button-container'>
        <button onClick={handleCalculate} className='button'>
          <span className='plus-icon'>+</span> Calculate
        </button>
        <button onClick={handleClear} className='clear-button'>
          Clear
        </button>
      </div>

      <footer className='footer'>
        <div className='footer-content'>
          <ul>
            <li>Exercise: 13-30 minutes of elevated heart rate activity</li>
            <li>Intense Exercise: 40-120 minutes of elevated heart rate activity</li>
            <li>Very Intense Exercise: 2 hours of elevated heart rate activity</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
