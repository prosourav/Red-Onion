import jwt_decode from "jwt-decode";

const firebaseConfig = {
    apiKey: "AIzaSyC2W_hGBJAJJ51pfJ-ufy8Qdx2R0s4DXgg",
    authDomain: "redonion-eeca2.firebaseapp.com",
    projectId: "redonion-eeca2",
    storageBucket: "redonion-eeca2.appspot.com",
    messagingSenderId: "1073518568459",
    appId: "1:1073518568459:web:973524d4493b6bcb10130e"
  };
  export default firebaseConfig;
  
  export const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const { name, picture, email } = jwt_decode(token);
    const decodedUser = {
        isSignedIn: true,
        name: name,
        email: email,
    }
    return decodedUser;
}