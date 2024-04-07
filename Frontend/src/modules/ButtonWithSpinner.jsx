import React, { useState } from 'react';
import '../assets/Login.css'; 

const ButtonWithSpinner = () => {
    const [count, setCount] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [renderKey, setRenderKey] = useState(0); 
    const [span1Text, setSpan1Text] = useState('');
    const [span2Text, setSpan2Text] = useState('');

    const handleClick = () => {
        setIsLoading(true);


        // Simulación de generación de llaves 2 segundos de espera
        setTimeout(() => {
        setIsLoading(false);
        setRenderKey(renderKey + 1); 
        
        setSpan1Text(`Public key - ${Math.random().toString(36).substring(7)}`);
        setSpan2Text(`Private key - ${Math.random().toString(36).substring(7)}`);
        }, 2000); 
        
        setCount(count + 1);

    
        
    };

  
    return (
        <div className="button-container">
            <div className="center-item">
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
            




            
            <div className="spans-container center-item" key={renderKey}>
                <span>{span1Text}</span>
                <span>{span2Text}</span>
            </div>
        </div>
    );
};

export default ButtonWithSpinner;
