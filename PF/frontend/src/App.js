import ResponsiveAppBar from './components/Navbar'
import './App.css';
import Main from './pages/Main'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar position="sticky"></Navbar>
      </header>
      <Main></Main>
    </div>
  );
}

export default App;
