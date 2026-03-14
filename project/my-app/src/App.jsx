import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import AllProject from './Components/AllProject';
import DetailsProject from './Components/DetailsProject';
import { Routes, Route } from "react-router-dom";
import React , { useState , createContext } from 'react';
import AddProject from './Components/AddProject';

export const NameContext = createContext();
export const RecipesContext = createContext(); 

function App() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
 const [recipes, setRecipes] = useState([]);


  return (
    <div className="App">
    {/* <h1>hello</h1> */}
      <NameContext.Provider value={{ userName, setUserName, email, setEmail }}>
          <RecipesContext.Provider value={{ recipes, setRecipes }}>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AllProject" element={<AllProject />} />
            <Route path="/AllProject/:AllProjectId" element={<DetailsProject />}/>
            <Route path="/AddProject" element={<AddProject />} />
          </Routes>
        </RecipesContext.Provider>
      </NameContext.Provider>
    </div>
  );
}

export default App;

