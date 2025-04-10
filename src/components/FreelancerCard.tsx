import React from "react";

interface FreelancerCardProps {
  freelancer: {
    id: number;
    username: string;
    bio: string;
    expertise: string;
    rate: string;
    profile_picture: string;
  };
}

const FreelancerCard = ({ freelancer }: FreelancerCardProps) => {
  return (
    <div className="freelancer-card">
      <img
        src={freelancer.profile_picture}
        alt={`${freelancer.username} profile`}
        className="profile-picture"
      />
      <h3>{freelancer.username}</h3>
      <p className="bio">{freelancer.bio}</p>
      <p className="expertise">Expertise: {freelancer.expertise}</p>
      <div className="footer">
        <span className="rate">${freelancer.rate} per hour</span>
      </div>
    </div>
  );
};

export default FreelancerCard;
