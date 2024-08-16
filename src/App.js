import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Auction from './pages/Auction';
import AuctionDetail from './pages/AuctionDetail';
import UsedDetail from './pages/UsedDetail';
import Used from './pages/Used';
import MyPage from './pages/MyPage';
import Charge from './pages/Charge';
import Exchange from './pages/Exchange';
import GoogleCallback from './pages/GoogleCallback';

import './css/App.css';
import UsedEdit from './pages/UsedEdit';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/used" element={<Used />} />
            <Route path="/used/:id" element={<UsedDetail />} />
            <Route path="/used/edit/:id" element={<UsedEdit />} />
            <Route path="/auction/edit/:id" element={<UsedEdit />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/charge" element={<Charge />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/register" element={<GoogleCallback />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
