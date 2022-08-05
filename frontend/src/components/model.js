import React from "react";
import axios from "axios";
import "./model.css";
import { useState } from "react";
import placeholder from "../placeholder.png";
import Modal from "react-bootstrap/Modal";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
const imageToBase64 = require("image-to-base64");

export default function Model() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    handleClose();
    setImg(dataUri);
  }

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  function handleCameraError(error) {
    console.log("handleCameraError", error);
  }

  function handleCameraStart(stream) {
    console.log("handleCameraStart");
  }

  function handleCameraStop() {
    console.log("handleCameraStop");
  }
  const handleDenoise = (img) => {};

  const [image, denoisedImage] = useState("");

  const [img, setImg] = useState(placeholder);
  // setImg();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    console.log(setImg);
  };

  return (
    <>
      <div className="split left">
        <div className="left_heading">
          <h1>Upload/Image Capture</h1>
        </div>
        <center>
          <div className="container py-4">
            <div>
              <input
                type="file"
                class="file"
                onChange={onImageChange}
                name="html"
              />
              <button class="capturebtn" onClick={handleShow}>
                Capture Photo
              </button>

              <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Capture Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="photoclick">
                    <Camera
                      onTakePhoto={(dataUri) => {
                        handleTakePhoto(dataUri);
                      }}
                      onTakePhotoAnimationDone={(dataUri) => {
                        handleTakePhotoAnimationDone(dataUri);
                      }}
                      onCameraError={(error) => {
                        handleCameraError(error);
                      }}
                      idealFacingMode={FACING_MODES.ENVIRONMENT}
                      idealResolution={{ width: 640, height: 480 }}
                      imageType={IMAGE_TYPES.PNG}
                      imageCompression={0.97}
                      isMaxResolution={true}
                      isImageMirror={true}
                      isSilentMode={true}
                      isDisplayStartCameraError={true}
                      isFullscreen={false}
                      sizeFactor={1}
                      onCameraStart={(stream) => {
                        handleCameraStart(stream);
                      }}
                      onCameraStop={() => {
                        handleCameraStop();
                      }}
                    />
                  </div>
                </Modal.Body>
              </Modal>
              <div className="image-div">
                <img className="image" src={img} alt="" />
              </div>
              <div className="denoisebtn">
                <button className="denoisebtn">Denoise</button>
              </div>
            </div>
          </div>
        </center>
      </div>

      <div className="split right">
        <div className="right_heading">
          <h1>ADNet Image Denoising Model</h1>
          <div className="image-div">
            <img className="image" src={img} alt="" />
          </div>
          <div className="noise">
            <p className="psnr">PSNR: </p>
            <p className="ssim">SSIM: </p>
          </div>
          <div className="download">
            <a href={img} download="Denoised Image">
              <button type="button">Download</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
