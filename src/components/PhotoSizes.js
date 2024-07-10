import React from 'react';

const PhotoSizes = ({ selectedSize, setSelectedSize }) => {
  const sizes = ['1 in/12 รูป', '1 in/6 รูป', '1.5 in/6 รูป', '2 in/6 รูป'];

  return (
    <div className="flex space-x-4">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`px-4 py-2 border rounded ${
            selectedSize === size ? 'bg-yellow-400' : 'bg-white'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default PhotoSizes;
