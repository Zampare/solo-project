import React, { component, useState, useEffect } from 'react';

const App = () => {
  const [lifts, setlifts] = useState([]);
  useEffect(() => {
    fetch('/api/lift').then(newlifts => {
      newlifts.json().then(data => setlifts(data));
    });
  }, []);
  let liftsStrings = [];
  for (let i = 0; i < lifts.length; i++) {
    liftsStrings.push(JSON.stringify(lifts[i]));
  }
  console.log(liftsStrings);
  return <div id='lifts'>{liftsStrings}</div>;
};
export default App;
