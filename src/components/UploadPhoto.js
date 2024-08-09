import React, { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./UploadPhoto.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UploadPhoto = ({
  setPhoto,
  photo,
  brightness,
  setBrightness,
  blur,
  setBlur,
}) => {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileWidth, setFileWidth] = useState("");
  const [fileHeight, setFileHeight] = useState("");
  const [originalPhoto, setOriginalPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          setOriginalPhoto(reader.result);
          setPhoto(reader.result);
          setFileName(file.name);
          setFileSize((file.size / 1024).toFixed(2) + " KB");
          setFileWidth(img.width);
          setFileHeight(img.height);
          setBrightness(100);
          setBlur(0);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setOriginalPhoto(null);
    setFileName("");
    setFileSize("");
    setFileWidth("");
    setFileHeight("");
    setBrightness(100);
    setBlur(0);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  const handleBlurChange = (e) => {
    setBlur(e.target.value);
  };

  const handleCrop = () => {
    setIsModalOpen(true);
  };

  const handleCropConfirm = () => {
    const cropper = cropperRef.current.cropper;
    setPhoto(cropper.getCroppedCanvas().toDataURL());
    setIsModalOpen(false);
  };

  const handleResetCrop = () => {
    setPhoto(originalPhoto);
    setBrightness(100);
    setBlur(0);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">อัพโหลดรูปภาพ</h2>
      <div className="upload-area" onClick={triggerFileInput}>
        <AiOutlineCloudUpload className="upload-icon" />
        <p className="upload-text">Drag and Drop here</p>
        <p className="upload-description">or</p>
        <button className="file-input-button">Select file</button>
        <input
          type="file"
          onChange={handleUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <p className="upload-description">
          JPG, PNG ขนาดไฟล์ไม่เกิน 10MB
        </p>
      </div>
      {photo && (
        <div className="mt-4 p-4 bg-purple-100 rounded-lg relative">
          <button
            onClick={handleRemovePhoto}
            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
          >
            <FaTimes />
          </button>
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
          <div className="mt-4">
            <label htmlFor="brightness" className="block text-center mb-2">
              ความสว่าง: {brightness}%
            </label>
            <input
              type="range"
              id="brightness"
              name="brightness"
              min="0"
              max="200"
              value={brightness}
              onChange={handleBrightnessChange}
              className="w-full fancy-range"
            />
          </div>
          <img
            src={photo}
            alt="Uploaded"
            className="mt-4 mx-auto"
            style={{
              filter: `brightness(${brightness}%) blur(${blur / 10}px)`,
              height: "60%",
              fit: "cover"
            }}
          />
          <div className="flex justify-center space-x-4 mt-3">
            <button onClick={handleResetCrop} className="button px-4 py-2">
              รีเซ็ต
            </button>
            <button onClick={handleCrop} className="button px-4 py-2">
              ครอปภาพ
            </button>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2 className="text-2xl mb-4">ครอปภาพ</h2>
          <Cropper
            src={photo}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={8 / 10}
            aspectRatio={8 / 10}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            dragMode="move"
            cropBoxMovable
            cropBoxResizable
            toggleDragModeOnDblclick={false}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCropConfirm}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadPhoto;
