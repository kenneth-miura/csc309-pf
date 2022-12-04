import './App.css';
import Main from './pages/Home'
import Navbar from './components/Navbar';
import ErrorPage from './pages/Error';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar position="sticky"></Navbar>
      </header>
      {/* <Main></Main> */}
      <ErrorPage></ErrorPage>
    </div>
  );
}

export default App;
