import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// Import pages (stubs for now)
import Home from './pages/Home';
import Services from './pages/Services';
import Videography from './pages/portfolio/Videography';
import Photography from './pages/portfolio/Photography';
import MontageReels from './pages/portfolio/MontageReels';
import VideoCinema from './pages/portfolio/VideoCinema';
import About from './pages/About';
import Contact from './pages/Contact';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio">
            <Route path="videography" element={<Videography />} />
            <Route path="photography" element={<Photography />} />
            <Route path="montage-reels" element={<MontageReels />} />
            <Route path="video-cinema" element={<VideoCinema />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
