import React, { useState, useEffect } from 'react';
const LiftGenerator = props => {
  const [selectedLift, changeSelectedLift] = useState('Bench');
  const [weight, changeWeight] = useState('');
  const [reps, changeReps] = useState('');
  const [rpe, changeRPE] = useState('');
  console.log(selectedLift);
  const submitLiftHandle = async () => {
    const newLift = {
      lift: selectedLift,
      weight: weight,
      reps: reps,
      rpe: rpe,
    };
    console.log(JSON.stringify(newLift));
    await fetch('/api/lift', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLift),
    });
    props.fetchLifts();
    changeWeight('');
    changeReps('');
    changeRPE('');
  };
  const liftChangeHandle = e => {
    changeSelectedLift(e.target.value);
  };
  const weightChangeHandle = e => {
    changeWeight(e.target.value);
  };
  const repsChangeHandle = e => {
    changeReps(e.target.value);
  };
  const rpeChangeHandle = e => {
    changeRPE(e.target.value);
  };

  return (
    <div id='liftgenerator'>
      <h2>LIFT SUBMIT</h2>
      <select
        name='lifts'
        id='lift select'
        defaultValue='Bench'
        onChange={liftChangeHandle}>
        <option value='Bench'>{'Bench'}</option>
        <option value='Squat'>{'Squat'}</option>
        <option value='Deadlift'>{'Deadlift'}</option>
      </select>
      <div>
        <strong>Weight:</strong>
        <input type='text' value={weight} onChange={weightChangeHandle}></input>
      </div>
      <div>
        <strong>Reps:</strong>
        <input type='text' value={reps} onChange={repsChangeHandle}></input>
      </div>
      <div>
        <strong>RPE:</strong>
        <input type='text' value={rpe} onChange={rpeChangeHandle}></input>
      </div>
      <button onClick={submitLiftHandle}>submit lift</button>
    </div>
  );
};
export default LiftGenerator;
