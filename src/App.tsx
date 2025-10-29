import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <NavigationBar />
      
      {/* Por ahora, cargamos solo la HomePage.
        En el futuro, aquí usarías react-router-dom para
        mostrar LoginPage, CategoryPage, etc.
      */}
      <HomePage />
    </>
  );
}

export default App;