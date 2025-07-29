import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
        <h2>admin dashboard</h2>
      </div>
    </>
  );
}

export default Home;
