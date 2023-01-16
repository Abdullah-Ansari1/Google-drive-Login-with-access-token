import React, { useState,useCallback } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login';

const GoogleAuth = () => {
//   const [accessToken, setAccessToken] = useState('');
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const [files, setFiles] = useState([]);

  const getFiles = async (accessToken) => {
    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    setFiles(data.files);
    console.log(data.files);
  }


  return (
    <div>
        <LoginSocialGoogle
          client_id="Your_Client_Id"
          scope="https://www.googleapis.com/auth/drive"
          onLogoutFailure={onLogoutFailure}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            getFiles(data.access_token)
            console.log(data, "data");
            console.log(provider, "provider");
          }}
          onReject={(err) => {
            console.log("error", err);
          }}
        >
         <button>Google Login</button>
        </LoginSocialGoogle>
    </div>
  );
}

export default GoogleAuth;
