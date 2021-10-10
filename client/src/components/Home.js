import React, { createContext} from "react";
import Profile from './Profile';

const headerNameChange=createContext();

const Home = () => {
  return (
    <div className="container w-100 h-100">
      <headerNameChange.Provider value={'User Details'}>
           <Profile ></Profile>
      </headerNameChange.Provider>
    </div>
  );
};

export default Home;
  export {headerNameChange}
