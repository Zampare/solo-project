import React, { useState, useEffect } from 'react';
const LiftSearch = props => {
  const [selectedLift, changeSelectedLift] = useState('');
  const [weight, changeWeight] = useState('');
  const [reps, changeReps] = useState('');
  const [rpe, changeRPE] = useState('');
  console.log(selectedLift);
  const searchLiftHandle = async () => {
    const searchLift = {
      lift: selectedLift,
      weight: weight,
      reps: reps,
      rpe: rpe,
    };
    // const searchLift = {};
    // if (selectedLift !== '') {
    //   searchLift['selectedLift'] = selectedLift;
    // }
    // if (selectedLift !== '') {
    //   searchLift['selectedLift'] = selectedLift;
    // }
    // if (selectedLift !== '') {
    //   searchLift['selectedLift'] = selectedLift;
    // }
    props.fetchSpecificLifts(searchLift);
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
    <div id='liftSearch'>
      <h2>LIFT SEARCH</h2>
      <select
        name='lifts'
        id='lift select'
        defaultValue=''
        onChange={liftChangeHandle}>
        <option value=''>All</option>
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
      <button onClick={searchLiftHandle}>Search Lifts</button>
    </div>
  );
};
export default LiftSearch;
