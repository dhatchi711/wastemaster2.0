import React from 'react';
import './Upload.css'

const Upload = () => {
    return(
        <div>
        <div class='upload-btn-wrapper'>  
        <button class='btn'>Upload an Image</button>
        <input type='file' name='myFile'></input>
        </div>
        </div>
        );
};

export default Upload;