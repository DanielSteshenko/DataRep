// Set up bootstrap and react with routing for todo app
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/HeaderComponent';
import { HomePage } from './pages/HomePage';
import { ListPage } from './pages/ListPage';
import { CreatePage } from './pages/CreatePage';
import { ErrorPage } from './pages/ErrorPage';
import { UpdatePage } from './pages/UpdatePage';
import { FooterComponent } from './components/FooterComponent';
class App extends React.Component {
  render() {
    return (
      <Router>
        {/* implement header */}
        <Header />
        {/* implement routes */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/list' element={<ListPage />} />
          <Route path='/update/:id' element={<UpdatePage />} />
          <Route path='*' element={<ErrorPage />} /> {/* 404 */}
        </Routes>
        {/* implement footer */}
        <FooterComponent />
      </Router>
    );
  }
}

export default App;
