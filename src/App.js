import "./App.css";
import React, { useState } from "react";
import compression from "browser-image-compression";

function App() {
  const [compressedLink, setCompressedLink] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [previewImg, setPreviewImage] = useState("");

  function upload(e) {
    const imageFile = e.target.files[0];
    setPreviewImage(URL.createObjectURL(imageFile));
    setOriginalImage(imageFile);
  }

  function compress() {
    const options = {
      maxSizeMB: 5
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Max Image Size: 5 MB");
      return 0;
    }

    compression(originalImage, options).then(img => {
      setCompressedLink(URL.createObjectURL(img));
    });
  }

  return (
    <div className="d-flex justify-content-between mt-5 mx-5">
      <div>
        <img
          src={previewImg && previewImg}
          style={{ maxWidth: 400, maxHeight: 400 }}
        />
        <div>
          <input
            type="file"
            accept="image/*"
            className="mt-2 btn btn-primary"
            onChange={upload}
          />
        </div>
      </div>
      <div>
        {previewImg && (
          <button className=" btn btn-primary" onClick={compress}>
            Compress
          </button>
        )}
      </div>
      <div>
        <img
          src={compressedLink && previewImg}
          style={{ maxWidth: 400, maxHeight: 400 }}
        />
        <div>
          {compressedLink && (
            <a
              href={compressedLink}
              download={compressedLink}
              className="mt-2 btn btn-primary"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
