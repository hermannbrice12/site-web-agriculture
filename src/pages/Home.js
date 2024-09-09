// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
