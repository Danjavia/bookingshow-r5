import React from "react";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import Header from "@presentation/components/Layout/Header";
import Footer from "@presentation/components/Layout/Footer";
import AppRoutes from "@routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
