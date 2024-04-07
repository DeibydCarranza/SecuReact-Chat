import { useRef } from "react";
import "../assets/Login.css";

export const Upload = ({ handleFile ,typeCri}) => {

    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };
    return (
        <>
            <button 
                className="upload-button" 
                onClick={handleClick}>
                {typeCri}
            </button>
            <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: "none" }} 
                required
            />
        </>
    );
};
