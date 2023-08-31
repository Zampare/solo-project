import React, { useState, useEffect } from 'react';
import LiftDisplay from './LiftDisplay.jsx';
import LiftGenerator from './LiftGenerator.jsx';
import LiftSearch from './LiftSearch.jsx';
const App = () => {
  const [lifts, setlifts] = useState([]);
  const [editvisible, seteditvisible] = useState(false);

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
      />,
    );
  }
  console.log(liftsdisplays);

  return (
    <div id='lifts'>
      <div id='topBox'>
        <EditBox />
        <LiftGenerator fetchLifts={fetchLifts} />
        <LiftSearch fetchSpecificLifts={fetchSpecificLifts} />
      </div>
      {liftsdisplays}
    </div>
  );
};
export default App;
