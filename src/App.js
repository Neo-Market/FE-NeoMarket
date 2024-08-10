import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Auction from './pages/Auction';
import AuctionDetail from './pages/AuctionDetail';
import Used from './pages/Used';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/auction/:id" component={AuctionDetail} />
            <Route path="/used-items" element={<Used />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
