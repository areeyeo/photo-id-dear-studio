import React, { useState } from 'react';
import UploadPhoto from './components/UploadPhoto';
import Header from './components/Header';
import PhotoOptions from './components/PhotoOptions';
import './index.css';

function App() {
  const [photo, setPhoto] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [blur, setBlur] = useState(0);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-8 mt-4">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 p-4">
            <UploadPhoto 
              setPhoto={setPhoto} 
              photo={photo} 
              brightness={brightness} 
              setBrightness={setBrightness} 
              blur={blur} 
              setBlur={setBlur} 
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <PhotoOptions 
              photo={photo} 
              brightness={brightness} 
              blur={blur} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
