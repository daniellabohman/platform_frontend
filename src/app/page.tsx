"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "@/components/CourseCard";

interface Instructor {
  id: number;
  username: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  instructor: Instructor;
}

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      <div>
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

export default Home;
