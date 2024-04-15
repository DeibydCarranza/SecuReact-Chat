// Login.jsx
import React, { useEffect, useState } from 'react';
import { Upload } from './Upload';
import ButtonWithSpinner from './ButtonWithSpinner';
import  '../assets/Login.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { SocketClient } from './SocketClient';

export function Login() {
  const socketClient = useContext(SocketClient)
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [keys, setKeys] = useState({});
  const [activeTab, setActiveTab] = useState('generate');
  const [fileNamePrivate, setFileNamePrivate] = useState('');
  const [fileNamePublic, setFileNamePublic] = useState('');
  const [keysUpload, setKeysUpload] = useState([]);
  const [backendKeysReceived, setBackendKeysReceived] = useState(false);
  const [keysGenerateButton, setKeysGenerateButton] = useState(false);


  useEffect(()=>{
    if (keysUpload.length === 2 && backendKeysReceived && !keysGenerateButton) {
      const datos = {
        publicKey: keysUpload[0].publicKey, privateKey: keysUpload[1].privateKey
      }
      setKeys( datos );
    }else{
      socketClient.on("Keys",(keys)=>{
        setKeys(keys);
      })
    }
  },[socketClient, keysUpload, backendKeysReceived])

  const singIn = useNavigate()

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  //Tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // File events
  const handleFilePrivate = (file) => {
    setFileNamePrivate(file.file.name);
    
    const privateKeyObj = {
      privateKey: file.contents,
    };
    
    const existingIndex = keysUpload.findIndex(obj => 'privateKey' in obj);
    
    if (existingIndex !== -1) {
      const updatedKeysUpload = [...keysUpload];
      updatedKeysUpload[existingIndex] = privateKeyObj;
      setKeysUpload(updatedKeysUpload);
    } else {
      setKeysUpload([...keysUpload, privateKeyObj]);
    }
    // console.log("FILE PRIVATE   ", file.contents);
  };

  const handleFilePublic = (file) => {
    setFileNamePublic(file.file.name);
    
    const publicKeyObj = {
      publicKey: file.contents,
    };
    
    const existingIndex = keysUpload.findIndex(obj => 'publicKey' in obj);
    
    if (existingIndex !== -1) {
      const updatedKeysUpload = [...keysUpload];
      updatedKeysUpload[existingIndex] = publicKeyObj;
      setKeysUpload(updatedKeysUpload);
    } else {
      setKeysUpload([...keysUpload, publicKeyObj]);
    }
    // console.log("FILE PUBLIC   ", file.contents);
  };
  
  const handleSumbmit = (event)=>{
    event.preventDefault()
    if (userName && password)
      singIn(`/home/${userName}`, {state:{
        userName:userName,
        secret: password,
        keys: keys
    }})
  }

  return (
    <form className="form_main " onSubmit={handleSumbmit}>
      <p className="heading center-item">Start a chat</p>
      <div className="login-cotainer ">
        
        {/* Input Username */}
        <div className="inputContainer">
          <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input placeholder="Username" 
            id="username-login" 
            value={userName}
            className="inputField" 
            type="text"
            onChange={handleUserNameChange}
            required/>
        </div>
            
        {/* Input Secret */}
        <div className="inputContainer">
            <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input 
              placeholder="Secret" 
              id="secret-login" 
              value={password}
              className="inputField" 
              type="password"
              onChange={handlePasswordChange}
            required/>
        </div>
                      

        {/* Login option */}
        <div className="tabs-login radio-input">

          <div className="tab-container">
            <label onClick={() => handleTabChange('generate')}>
              <input type="radio" checked={activeTab === 'generate'} />
              <span>Generate</span>
            </label>
            <label onClick={() => handleTabChange('upload')}>
              <input type="radio" checked={activeTab === 'upload'} />
              <span>Upload keys</span>
            </label>

            <div className="tab-content">

              {/* Option Generate */}
              {activeTab === 'generate' && (
                <>
                  <section className="generate-section">
                    <ButtonWithSpinner socketClient={socketClient} setKeysGenerateButton={setKeysGenerateButton} ></ButtonWithSpinner>
                  </section>
                </>
              )}

              {/* Option Upload */}
              {activeTab === 'upload' && (
                <section className="upload-section">
                  <div className="upload-components name-upload">
                    <Upload handleFile={handleFilePublic} setBackendKeysReceived={setBackendKeysReceived} setKeysGenerateButton={setKeysGenerateButton} typeCri="Public" />
                    {fileNamePublic ? <p>Public Key: {fileNamePublic}</p> :  <span >Select a file</span>}
                  </div>

                  <div className="upload-components name-upload">
                    <Upload handleFile={handleFilePrivate} setBackendKeysReceived={setBackendKeysReceived} setKeysGenerateButton={setKeysGenerateButton} typeCri="Private" />
                    {fileNamePrivate ? <p>Private Key: {fileNamePrivate}</p> : <span>Select a file</span>}
                  </div>
                </section>
              )}

            </div>
          </div>

        </div>

        {/* Send Button */}
        <div className="center-item">
          <button className="send-login">Sing in</button>
        </div>

      </div>
    </form>
  );
}

export default Login;
