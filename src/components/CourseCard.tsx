import React from 'react';

// Instructor interface
interface Instructor {
  id: number;
  username: string;
}

// Course interface with instructor as an object
interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  instructor: Instructor; // Updated this to an object with 'id' and 'username'
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="course-card">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
      <p>Instructor: {course.instructor.username}</p> {/* Access the username of the instructor */}
    </div>
  );
};

export default CourseCard;
