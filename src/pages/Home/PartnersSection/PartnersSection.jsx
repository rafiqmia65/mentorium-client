import React from "react";
import Marquee from "react-fast-marquee";

import googleLogo from "../../../assets/partners/Google.png";
import amazonLogo from "../../../assets/partners/amazon.png";
import alibabaLogo from "../../../assets/partners/alibaba.png";
import microsoftLogo from "../../../assets/partners/microsoft.png";
import teslaLogo from "../../../assets/partners/tesla.png";
import samsungLogo from "../../../assets/partners/samsung.png";
import metaLogo from "../../../assets/partners/meta.png";
import netflixLogo from "../../../assets/partners/netflix.png";

const PartnersSection = () => {
  const partners = [
    { id: 1, name: "Google", logo: googleLogo },
    { id: 2, name: "Amazon", logo: amazonLogo },
    { id: 3, name: "Alibaba", logo: alibabaLogo },
    { id: 4, name: "Microsoft", logo: microsoftLogo },
    { id: 5, name: "Tesla", logo: teslaLogo },
    { id: 6, name: "Samsung", logo: samsungLogo },
    { id: 7, name: "Meta", logo: metaLogo },
    { id: 8, name: "Netflix", logo: netflixLogo },
  ];

  return (
    <section className="py-16 px-4 bg-base-100 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Our Global Partners
        </h2>
        <p className="text-lg text-text mb-12 max-w-2xl mx-auto">
          We collaborate with industry giants to deliver cutting-edge solutions
          worldwide.
        </p>

        {/* Marquee Effect */}
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          {partners.map((partner) => (
            <div key={partner.id} className="mx-8">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;
