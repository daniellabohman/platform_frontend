"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FreelancerCard from "@/components/FreelancerCard"; // Update to use FreelancerCard
import Header from "@/components/Header";
import '@/styles/home.css';

// Define the interface for an Instructor (Freelancer)
interface Instructor {
  id: number;
  username: string;
  bio: string;
  expertise: string;
  rate: string; // Assuming you added the rate column
  profile_picture: string; // Assuming you added the profile_picture column
}

const Home = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]); // Use Instructor instead of Course

  useEffect(() => {
    // Fetch instructors instead of courses
    axios
      .get("http://localhost:5000/instructors") // Update API to fetch instructors
      .then((response) => {
        setInstructors(response.data.instructors); // Make sure your API returns a list of instructors
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Find de bedste eksperter</h1>
          <p>
            Gennemse dygtige eksperter og specialister til dine forretnings- eller personlige behov. 
          </p>
          <a href="/freelancers" className="cta-button">Find Ekspert</a>
        </div>
      </section>

      {/* Dark Blocker Section */}
      <section className="dark-blocker">
      {/*<img src="/path-to-your-logo.png" alt="Logo" className="dark-blocker-logo" />*/}
    
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Om nExpertia</h2>
          <p>
          nExperita hjælper freelancere og iværksættere med at administrere deres arbejde, bookinger, fakturering og abonnementer – alt sammen på én brugervenlig platform.
          Uanset om du er freelancer, der styrer din forretning, eller en kunde, der leder efter en pålidelig ekspert til dit hobbyprojekt eller til din virksomhed, kan nExpertia hjælpe dig.
          </p>
          <a href="#freelancers" className="btn">Kom igang</a>
        </div>
      </section>

      {/* Freelancer Section */}
      <section className="freelancer-section">
        <div className="container">
          <h2 className="section-title">Mød vores freeelancere</h2>
          <div className="freelancer-grid">
            {instructors.length > 0 ? (
              instructors.map((instructor) => (
                <FreelancerCard key={instructor.id} freelancer={instructor} />
              ))
            ) : (
              <p>No freelancers available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
