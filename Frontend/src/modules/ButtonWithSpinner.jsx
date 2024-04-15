import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import '../assets/Login.css'; 

const ButtonWithSpinner = ({socketClient, setKeysGenerateButton}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [renderKey, setRenderKey] = useState(0); 
    const [span1Text, setSpan1Text] = useState('');
    const [span2Text, setSpan2Text] = useState('');
    const [keys, setKeys] = useState(null);

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    useEffect(() => {
        socketClient.on("Keys", (keysFromServer) => {
          setKeys(keysFromServer);
        });
    
        return () => {
          socketClient.off("Keys"); 
        };
      }, [socketClient]);
    
    useEffect(() => {
        if (keys) {
            setSpan1Text(keys.publicKey); 
            setSpan2Text(keys.privateKey); 
        }
    }, [keys]);

    const handleClick = async(event) => {
        event.preventDefault();
        setIsLoading(true);
        
        await sleep(500);
        socketClient.emit("GetKeys", '')
 
        setIsLoading(false);
        setRenderKey(renderKey + 1); 
        
        setKeysGenerateButton(true);
    };
    
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    console.log("LLAVES DESDE BOTON SPINNER ->\n", keys);

    return (
        <div className="button-container">
            <div className="center-item-b">
                <button className="custom-button" onClick={handleClick}>
                {isLoading ? (
                <span className="spinner" />
                ) : (
                    <div className='center-item'>
                    <span>New pair</span> 
                    </div>
                )}
            </button>
            </div>
            
            <div className="spans-container" key={renderKey}>
                {keys && (
                    <div className="code-container ">
                        <div className="key-container">
                            <pre className="key-text">{span1Text}</pre>
                            <button className="copy-button" onClick={() => copyToClipboard(span1Text)} type="button">Copy</button>
                        </div>
                        <div className="key-container">
                            <pre className="key-text">{span2Text}</pre>
                            <button className="copy-button" onClick={() => copyToClipboard(span2Text)} type="button">Copy</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ButtonWithSpinner;