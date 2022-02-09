import './App.css';
import { Route, Routes, Navigate} from "react-router-dom";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Main from './components/Main'
import Header from './components/Header'
import Memories from './components/Memories';
import ViewMemoryDetails from './components/ViewMemoryDetails'
import history from './history';
import AllMemories from './components/AllMemories';

function App() {
  const user = localStorage.getItem("token");
  return (
        <>
          {user || history.path === '/login' ? <Header /> : ''}
          <Routes history={history} >
            {user && <Route path="/" exact element={<Main />} />}
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/memories" exact element={<Memories />} />
            <Route path="/all-memories" exact element={<AllMemories />} />
            <Route path="/viewdetails" exact element={<ViewMemoryDetails />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </>
  );
}

export default App;
