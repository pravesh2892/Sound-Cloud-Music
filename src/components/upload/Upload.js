import { useState } from "react";
import React from "react";
import "./Upload.css";



function Upload() {
  return (
    <div className="upload__form__c">
      <div className="up__f__c">
        <form>
          <div id="upload__title">Upload</div>
          <input
            type="text"
            placeholder="Title"
            className="upload__inputs"
            required
          />
          <input
            type="text"
            placeholder="Artist"
            className="upload__inputs"
            required
          />
         
          <input
            type="text"
            placeholder="Album Name"
            className="upload__inputs"
            required
          />
          <input
            type="text"
            placeholder="Album Cover Image URL"
            className="upload__inputs"
            required
          />
          <label>Audio File</label>
          <input
            type="file"
            placeholder="Audio/MP3"
            className="upload__inputs"
            id="audio__input"
            required
          />
          <button className="uploadBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
