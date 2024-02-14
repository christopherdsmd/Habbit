import React from 'react';
import './save-the-frogs.css';

const SaveTheFrogs = () => {
  return (
    <div className="container">
      <div className="center-info">
        <h1 className="company-name">Frogs Need Your Help!</h1>
        <img src="\assets\tree_frog.png" className="company-image" alt="treefrog" />
      </div>
      
      <p className="paragraph">
        Frogs are a crucial part of Earth's many ecological communities such as woodlands, grassy areas, and ponds. Frogs eat pesky mosquitoes, flies, and other insects. Other species also depend on frogs for food, such as fish and birds. Frogs are a crucial member of the ecosystem that must be protected. According to the USGS, the overall amphibian population decline is 3.79 percent per year. If this rate remains unchanged, some species will disappear from half of the habitats they occupy in about 20 years.
      </p>
      <br/><br/>
      <p>
        Please consider checking out the following organizations doing their best to protect our green friends.
      </p>

      <div className="donation-info">
        <div className="company-info">
          <div className="company-details">
            <a href="https://savethefrogs.com/" className="company-name">Save the Frogs!</a>
            <p className="company-description">Founded by Dr. Kerry Kriger, Save the Frogs is a large global team of scientists, educators, policymakers, and naturalists with the goal of protecting frog and amphibian wildlife around the world.</p>
          </div>
          <img src="\assets\save_the_frogs.jpg" className="company-image" alt="Save the Frogs" />
        </div><br/>

        <div className="company-info">
          <div className="company-details">
            <a href="https://amphibianfoundation.org/" className="company-name">The Amphibian Foundation</a>
            <p className="company-description">The Amphibian Foundation is a nonprofit organization. Its goal is to connect individuals and communities with solutions to the global amphibian extinction crisis. Based in Atlanta, the team focuses on various conservation programs and education for everyone to explore.</p>
          </div>
          <img src="\assets\Amphibian_Foundation_MembershipWHITE-SM2.png" className="company-image" alt="The Amphibian Foundation" />
        </div><br/>

        <div className="company-info">
          <div className="company-details">
            <a href="https://www.nwf.org/California/Our-Work/Refrogging-America" className="company-name">National Wildlife Federation - Re-Frogging America</a>
            <p className="company-description">The National Wildlife Federation is working with Save the Frogs to encourage residents, schools, and communities in California to create native plant gardens and habitats that support native amphibian populations.</p>
          </div>
          <img src="\assets\nwf-logo-2023.png" className="company-image" alt="National Wildlife Federation - Re-Frogging America" />
        </div>
      </div>
    </div>
  );
};

export default SaveTheFrogs;
