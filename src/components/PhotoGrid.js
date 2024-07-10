import React from 'react';

const PhotoGrid = ({ photo, size }) => {
  if (!photo || !size) return null;

  const gridSizes = {
    '1 in/12 รูป': 'grid-cols-4',
    '1 in/6 รูป': 'grid-cols-2',
    '1.5 in/6 รูป': 'grid-cols-2',
    '2 in/6 รูป': 'grid-cols-2',
  };

  const photoCount = size.includes('12') ? 12 : 6;

  return (
    <div className={`grid ${gridSizes[size]} gap-2`}>
      {Array.from({ length: photoCount }).map((_, idx) => (
        <img key={idx} src={photo} alt={`Grid ${idx}`} className="w-full h-auto" />
      ))}
    </div>
  );
};

export default PhotoGrid;
