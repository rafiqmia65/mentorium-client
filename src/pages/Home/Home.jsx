import React from 'react';
import Banner from './Banner/Banner';
import PartnersSection from './Partnerssection/PartnersSection';
import WhyChooseMentorium from './WhyChooseMentorium/WhyChooseMentorium';
import EventsSection from './EventsSection/EventsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PartnersSection></PartnersSection>
            <WhyChooseMentorium></WhyChooseMentorium>
            <EventsSection></EventsSection>
        </div>
    );
};

export default Home;