import React, { useState, useEffect } from 'react';

const EditBox = props => {
  const things = props.things;
  const {
    editposition,
    edithidden,
    setedithidden,
    selectedEditLift,
    changeSelectedEditLift,
    editweight,
    changeEditWeight,
    editreps,
    changeEditReps,
    editrpe,
    changeEditRPE,
    editID,
  } = things;
  const style = {
    top: `${editposition[0] + window.scrollY}px`,
    left: `${editposition[1] - 100}px`,
    display: edithidden ? 'none' : 'flex',
  };
  const closeEditWindow = async () => {
    setedithidden(true);
  };
  const editLiftHandle = async () => {
    const updateLift = {
      lift: selectedEditLift,
      weight: editweight,
      reps: editreps,
      rpe: editrpe,
    };
    console.log(editID, typeof editID);
    await fetch(`/api/lift/${editID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateLift),
    });
    props.fetchLifts();
    setedithidden(true);
  };
  const liftChangeHandle = e => {
    changeSelectedEditLift(e.target.value);
  };
  const weightChangeHandle = e => {
    changeEditWeight(e.target.value);
  };
  const repsChangeHandle = e => {
    changeEditReps(e.target.value);
  };
  const rpeChangeHandle = e => {
    changeEditRPE(e.target.value);
  };
  return (
    <div id='Edit' hidden={edithidden} style={style}>
      <div id='edittop'>
        <h2>Edit Lift</h2>
        <button onClick={closeEditWindow}>exit</button>
      </div>
      <div id='Editform'>
        <select
          name='lifts'
          id='lift select'
          value={selectedEditLift}
          onChange={liftChangeHandle}>
          <option value='Bench'>{'Bench'}</option>
          <option value='Squat'>{'Squat'}</option>
          <option value='Deadlift'>{'Deadlift'}</option>
        </select>
        <div>
          <strong>Weight:</strong>
          <input
            type='text'
            value={editweight}
            onChange={weightChangeHandle}></input>
        </div>
        <div>
          <strong>Reps:</strong>
          <input
            type='text'
            value={editreps}
            onChange={repsChangeHandle}></input>
        </div>
        <div>
          <strong>RPE:</strong>
          <input type='text' value={editrpe} onChange={rpeChangeHandle}></input>
        </div>
        <button onClick={editLiftHandle} id='editexit'>
          edit lift
        </button>
      </div>
    </div>
  );
};
export default EditBox;
