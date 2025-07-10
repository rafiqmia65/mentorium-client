import React from 'react';
import Banner from './Banner/Banner';
import PartnersSection from './Partnerssection/PartnersSection';
import WhyChooseMentorium from './WhyChooseMentorium/WhyChooseMentorium';
import EventsSection from './EventsSection/EventsSection';
import BecomeInstructor from './BecomeInstructor/BecomeInstructor';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseMentorium></WhyChooseMentorium>
            <EventsSection></EventsSection>
            <BecomeInstructor></BecomeInstructor>
            <PartnersSection></PartnersSection>
        </div>
    );
};

export default Home;