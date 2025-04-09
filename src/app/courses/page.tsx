'use client';

import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Interface for instructor (with updated fields)
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
  instructor: Instructor; // Instructor is now an object
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If there is no token, redirect to login
      router.push("/login");
    } else {
      // Set authorization token for axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch courses from the backend
      axios.get('http://localhost:5000/courses')
        .then(response => {
          setCourses(response.data.courses);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            if (error.response.status === 401) {
              console.error("Unauthorized, redirecting to login...");
              localStorage.removeItem("token");  // Remove invalid token
              router.push("/login");
            } else {
              console.error("Backend error:", error.response.data);
              setError("There was an error fetching courses. Please try again.");
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.error("Network error:", error.request);
            setError("Network error. Please check your internet connection.");
          } else {
            // Something happened in setting up the request
            console.error("Error setting up the request:", error.message);
            setError("Error setting up the request. Please try again.");
          }
        });
    }
  }, [router]);

  return (
    <div>
      <h1>Courses</h1>
      
      {/* Error message display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
