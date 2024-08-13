import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    axios
      .get('http://worldtimeapi.org/api/timezone')
      .then(({ data }) => setTimezones(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedTimezone) {
      axios
        .get(`http://worldtimeapi.org/api/timezone/${selectedTimezone}`)
        .then(({ data }) => setTime(new Date(data.datetime).toLocaleString()))
        .catch(console.error);
    }
  }, [selectedTimezone]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-800'>
      <div className='bg-gray-100 shadow-lg rounded-lg p-6 px-8 w-full max-w-fit'>
        <h1 className='text-4xl font-bold text-gray-800 mb-6 text-center'>International Clocks</h1>
        <select
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black-900'
          onChange={(e) => setSelectedTimezone(e.target.value)}
          value={selectedTimezone}
        >
          <option value="" disabled>Select a timezone</option>
          {timezones.map((zone, index) => (
            <option key={index} value={zone}>
              {zone}
            </option>
          ))}
        </select>
        {time && (
          <div className='border border-gray-700 bg-gray-800 rounded-lg mt-6 p-4 shadow-md'>
            <h2 className='text-xl font-semibold text-white mb-2'>{selectedTimezone}</h2>
            <p className='text-lg text-white'>{time}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
