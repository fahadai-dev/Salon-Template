import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { useEffect } from "react";
import { businessData } from "./data/business";

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      businessData.theme.primary,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      businessData.theme.secondary,
    );
    document.documentElement.style.setProperty(
      "--dark-color",
      businessData.theme.dark,
    );
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default App;
