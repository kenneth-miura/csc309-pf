import './App.css';
import Main from './pages/Home'
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar position="sticky"></Navbar>
      </header>
      {/* <LoginPage></LoginPage> */}
      <Main></Main>
    </div>
  );
}

export default App;
