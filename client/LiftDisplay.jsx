import React, { component, useState, useEffect } from 'react';

const LiftDisplay = props => {
  const lift = props.lift;
  console.log(lift);
  return (
    <div className='liftDisplay'>
      <strong>Lift:</strong>
      {lift.lift}
      <strong>Weight:</strong>
      {lift.weight}
      <strong>Reps:</strong>
      {lift.reps}
      <strong>RPE:</strong>
      {lift.rpe}
      <strong>Date:</strong>
      {lift.date.toString()}
      <button onClick={props.deleteLift}>Delete</button>
    </div>
  );
};
export default LiftDisplay;
