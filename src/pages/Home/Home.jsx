import React from 'react';
import Banner from './Banner/Banner';
import PartnersSection from './Partnerssection/PartnersSection';
import WhyChooseMentorium from './WhyChooseMentorium/WhyChooseMentorium';
import EventsSection from './EventsSection/EventsSection';
import BecomeInstructor from './BecomeInstructor/BecomeInstructor';
import PopularClasses from './PopularClasses/PopularClasses';
import FeedbackSection from './FeedbackSection/FeedbackSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <WhyChooseMentorium></WhyChooseMentorium>
            <EventsSection></EventsSection>
            <BecomeInstructor></BecomeInstructor>
            <FeedbackSection></FeedbackSection>
            <PartnersSection></PartnersSection>
        </div>
    );
};

export default Home;