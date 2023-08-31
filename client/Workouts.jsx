import React, { useState, useEffect } from 'react';
import LiftDisplay from './LiftDisplay.jsx';
import LiftGenerator from './LiftGenerator.jsx';
import LiftSearch from './LiftSearch.jsx';
import EditBox from './EditBox.jsx';
import { useNavigate } from 'react-router-dom';
const Workouts = () => {
  const navigate = useNavigate();
  const [lifts, setlifts] = useState([]);
  const [editID, seteditID] = useState(-1);
  const [edithidden, setedithidden] = useState(true);
  const [selectedEditLift, changeSelectedEditLift] = useState('');
  const [editweight, changeEditWeight] = useState('');
  const [editreps, changeEditReps] = useState('');
  const [editrpe, changeEditRPE] = useState('');
  const [editposition, changeEditPosition] = useState([0, 0]);
  const things = {
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
    fetchLifts,
  };
  const openEditBox = (lift, position) => {
    setedithidden(false);
    seteditID(lift.id);
    changeSelectedEditLift(lift.lift);
    changeEditPosition(position);
    changeEditWeight(lift.weight);
    changeEditReps(lift.reps);
    changeEditRPE(lift.rpe);
  };
  const logOut = () => {
    navigate('/');
  };
  useEffect(() => {
    fetchLifts();
  }, []);
  const fetchLifts = () => {
    fetch('/api/lift', {
      method: 'GET',
    }).then(newlifts => {
      newlifts.json().then(data => setlifts(data));
    });
  };
  const fetchSpecificLifts = async search => {
    let url = '/api/lift?';
    let first = true;
    for (const [key, value] of Object.entries(search)) {
      if (value) {
        if (!first) {
          url += '&';
        }
        first = false;
        url += key + '=' + value;
      }
    }
    const result = await fetch(url, { method: 'GET' });
    if (result.status === 200) {
      const data = await result.json();
      setlifts(data);
    } else {
      console.log('error fetching lifts');
    }
  };
  const deleteLift = async id => {
    await fetch(`/api/lift/${id}`, { method: 'DELETE' });
    fetchLifts();
  };
  const liftsdisplays = [];
  for (let i = 0; i < lifts.length; i++) {
    liftsdisplays.push(
      <LiftDisplay
        key={'lift' + lifts[i].id}
        lift={lifts[i]}
        deleteLift={() => {
          deleteLift(lifts[i].id);
        }}
        openEditBox={e => {
          const pos = e.target.parentElement.getBoundingClientRect();
          openEditBox(lifts[i], [pos.bottom, pos.left]);
        }}
      />,
    );
  }

  return (
    <div id='lifts'>
      <div id='topBox'>
        <button id='logout' onClick={logOut}>
          Log Out
        </button>
        <EditBox things={things} fetchLifts={fetchLifts} />
        <LiftGenerator fetchLifts={fetchLifts} />
        <LiftSearch fetchSpecificLifts={fetchSpecificLifts} />
      </div>
      {liftsdisplays}
    </div>
  );
};
export default Workouts;
