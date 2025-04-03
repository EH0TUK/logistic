import React from 'react';
import './Home.css';
import CompanyAdvantages from '../../components/layout/companyAdvantages/CompanyAdvantages'; 
import CompanyInfo from '../../components/layout/companyInfo/CompanyInfo';
import Hero from '../../components/layout/hero/Hero';
import CompanyStats from '../../components/layout/companyStats/CompanyStats';
import DeliveryCalculator from '../../components/layout/deliveryCalculator/DeliveryCalculator';

const Home = () => {


  return (
    <div className="home">
      <Hero />
      <CompanyInfo />
      <CompanyAdvantages />
      <CompanyStats />
      <DeliveryCalculator />
    </div>
  );
};

export default Home;