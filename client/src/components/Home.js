import React, { useState, useEffect ,createContext} from "react";
import Profile from './Profile';
import UserService from "../services/user.service";

const headerNameChange=createContext();

const Home = () => {
  const [content, setContent] = useState("User Details");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <headerNameChange.Provider value={content}>
           <Profile ></Profile>
      </headerNameChange.Provider>
    </div>
  );
};

export default Home;
  export {headerNameChange}
