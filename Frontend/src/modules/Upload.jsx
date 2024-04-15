import { useRef } from "react";
import "../assets/Login.css";

export const Upload = ({ handleFile ,typeCri, setBackendKeysReceived, setKeysGenerateButton}) => {

    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        event.preventDefault();
        hiddenFileInput.current.click();
        setBackendKeysReceived(true);
        setKeysGenerateButton(false);
    };
    
    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        const fileContents = await readFileContents(fileUploaded);
        handleFile({ file: fileUploaded, contents: fileContents });
      };

    const readFileContents = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const contents = event.target.result;
            resolve(contents);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });
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