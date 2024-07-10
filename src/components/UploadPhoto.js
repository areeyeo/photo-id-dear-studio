import React, { useState } from 'react';

const UploadPhoto = ({ setPhoto, photo }) => {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileWidth, setFileWidth] = useState("");
  const [fileHeight, setFileHeight] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          setPhoto(reader.result);
          setFileName(file.name);
          setFileSize((file.size / 1024).toFixed(2) + " KB");
          setFileWidth(img.width);
          setFileHeight(img.height);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">อัพโหลดรูปภาพ</h2>
      <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg mb-4">
        <div className="flex flex-col items-start">
           <input type="file" onChange={handleUpload} className="mb-4" /> 
        </div>        
        <div className="flex flex-col items-center">
          <p>เลือกอรูปภาพหรือลากและวางที่นี่</p>
          <p>JPG, PNG หรือ PDF, ขนาดไฟล์ไม่เกิน 10MB</p>
        </div>
      </div>
      {photo && (
        <div className="mt-4 p-4 bg-purple-100 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>ชื่อไฟล์: {fileName}</p>
              <p>ขนาดไฟล์: {fileSize}</p>
            </div>
            <div>
              <p>ความกว้าง: {fileWidth}</p>
              <p>ความสูง: {fileHeight}</p>
            </div>
          </div>
          <img src={photo} alt="Uploaded" className="mt-4 rounded-lg mx-auto" />
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
