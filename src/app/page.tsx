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
          <h1>Find the Best Freelancers for Your Projects</h1>
          <p>Browse expert freelancers and specialists for your business or personal needs.</p>
          <a href="/freelancers" className="cta-button">Find a Freelancer</a>
        </div>
      </section>

      {/* Dark Blocker Section */}
      <section className="dark-blocker">
      {/*<img src="/path-to-your-logo.png" alt="Logo" className="dark-blocker-logo" />*/}
    
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About FreelanceHub</h2>
          <p>
            FreelanceHub helps freelancers and entrepreneurs manage their work, bookings, invoicing, and subscriptions in one easy-to-use platform. 
            Whether you're a freelancer managing your business or a client looking for a reliable expert, FreelanceHub is your go-to solution.
          </p>
          <a href="#freelancers" className="btn">Get Started</a>
        </div>
      </section>

      {/* Freelancer Section */}
      <section className="freelancer-section">
        <div className="container">
          <h2 className="section-title">Meet Our Freelancers</h2>
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
