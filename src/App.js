import React, { useState } from 'react';
import UploadPhoto from './components/UploadPhoto';
import Header from './components/Header';
import PhotoOptions from './components/PhotoOptions';
import './index.css';

function App() {
  const [photo, setPhoto] = useState(null);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-8 mt-4">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 p-4">
            <UploadPhoto setPhoto={setPhoto} photo={photo} />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <PhotoOptions photo={photo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
