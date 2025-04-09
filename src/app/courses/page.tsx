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
          if (error.response?.status === 401) {
            // If the token is invalid, redirect to login
            console.error("Unauthorized, redirecting to login...");
            localStorage.removeItem("token");  // Remove invalid token
            router.push("/login");
          } else {
            console.error("There was an error fetching courses!", error);
            setError("There was an error fetching courses. Please try again.");
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
