import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Attractions from "@/pages/Attractions";
import Visit from "@/pages/Visit";
import Gallery from "@/pages/Gallery";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <TooltipProvider>
      <Header />
      <main className="min-h-screen pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about">
            {() => {
              return (
                <>
                  <ScrollToTop />
                  <About />
                </>
              );
            }}
          </Route>
          <Route path="/attractions">
            {() => {
              return (
                <>
                  <ScrollToTop />
                  <Attractions />
                </>
              );
            }}
          </Route>
          <Route path="/visit">
            {() => {
              return (
                <>
                  <ScrollToTop />
                  <Visit />
                </>
              );
            }}
          </Route>
          <Route path="/gallery">
            {() => {
              return (
                <>
                  <ScrollToTop />
                  <Gallery />
                </>
              );
            }}
          </Route>
          <Route path="/events">
            {() => {
              return (
                <>
                  <ScrollToTop />
                  <Events />
                </>
              );
            }}
          </Route>
          <Route path="/contact">
            {() => {
              return (
                <>
                  <ScrollToTop />
                  <Contact />
                </>
              );
            }}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </TooltipProvider>
  );
}

export default App;
