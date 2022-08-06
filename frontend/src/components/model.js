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
  const [img, setImg] = useState(placeholder);
  const [denoisedImage, setDenoisedImage] = useState("");
  const [metrics, setMetrics] = useState({ psnr: " ", ssim: "" });
  const [file_obj, setFileObj] = useState(false);
  const [check, setCheck] = useState(false);
  const [denoisedImageObj, setDenoisedImageObj] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    handleClose();
    setImg(dataUri);
    setCheck(true);
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
  const handleDenoise = () => {
    console.log(img);
    if (!check) {
      getBase64(file_obj)
        .then((result) => {
          axios
            .post("http://127.0.0.1:5000/predict", {
              x: result.slice(23, result.length),
            })
            .then((res) => {
              setDenoisedImage(res.data.image);
              setMetrics({ psnr: res.data.psnr, ssim: res.data.ssim });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://127.0.0.1:5000/predict", {
          x: img.slice(23, img.length),
        })
        .then((res) => {
          setDenoisedImage(res.data.image);
          setMetrics({ psnr: res.data.psnr, ssim: res.data.ssim });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // setImg();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    setFileObj(file);
    setCheck(false);
    // console.log(img);
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
                      imageType={IMAGE_TYPES.JPG}
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
                <button
                  className="denoisebtn"
                  onClick={() => {
                    handleDenoise();
                  }}
                >
                  Denoise
                </button>
              </div>
            </div>
          </div>
        </center>
      </div>

      <div className="split right">
        <div className="right_heading">
          <h1>ADNet Image Denoising Model</h1>
          <div className="image-div">
            <img
              className="image"
              src={`data:image/png;base64,${denoisedImage}`}
              alt=""
            />
          </div>
          <div className="noise">
            <p className="psnr">PSNR: {metrics.psnr}</p>
            <p className="ssim">SSIM: {metrics.ssim}</p>
          </div>
          <div className="download">
            <a href={`data:image/png;base64,${denoisedImage}`} download="Denoised Image">
              <button type="button">Download</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
