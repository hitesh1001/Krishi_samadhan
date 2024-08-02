
import Header from './components/Header/Header.jsx';
import Home from './components/home/Home.jsx';
import DataProvider from './context/DataProvider.jsx';

function App() {
  return (
    <DataProvider className="App">
      <Header />
      <Home />
    </DataProvider>
  );
}

export default App;
