"use client";
import React from "react";
import { useState, useEffect, useRef, FormEvent } from "react";
import styles from "./feedback.module.css";
import { addFeedback, checkUser } from "@/app/lib/action";
import { set } from "mongoose";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";



const FeedbackPage = () => {
  
  const [courses, setCourseList] = useState<string[]>([]);
  const [ifLoadCourses, setifLoadCourses] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // useEffect(() => {
    const fetchCourses = async () => {
    
      //const apiUrl = "http://192.168.46.229:5000/getCourses";
      const apiUrl = "https://course-planner-backend-cuqlqc5v7a-em.a.run.app/getCourses";
  
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        console.log("Fetched courses:", data["response"]); // Check if data is received
        const x: string[] = data["response"].map((value: any) => String(value)); 
        setCourseList(x); // Update courses state
        console.log({courses});
        setifLoadCourses(true);
      } catch (error) {
        console.error("Fetch courses error:", error); // Log any fetch errors
      }
    };
  
    if(ifLoadCourses === false){
      fetchCourses();
    }
    
  // }, []);



  
  const [uploadStatus, setUploadStatus] = useState(null); 
  const [selectedRating1, setSelectedRating1] = useState<number>(0);
  const [selectedRating2, setSelectedRating2] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCourseSelect = (course: string) => {
    
    setSelectedCourse(course);
    setIsDropdownOpen(false);
  };
  
  
  const handleRatingClick = async (rating: number, type: number) => {
    if (type === 1) {
      setSelectedRating1(rating);
      console.log({selectedRating1});
    } else {
      setSelectedRating2(rating);
    }
  };
  

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    console.log('here1');
    e.preventDefault();
    console.log('here2');
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    addFeedback(formData).then(() => {
      form.reset();
      setShowSuccessMessage(true);
      setTimeout (() => {
        setShowSuccessMessage(false);
      }, 3000);
      setSelectedRating2(0);
      setSelectedRating1(0);
      setSelectedCourse('Select Course');


    });
  };

  const feedbackPlaceholder =
    "Provide Feedback\n Make sure to provide relevant feedback which can guide your juniors better. Your feedback can include:\n 1.How to prepare for exams \n 2. Overall course management \n 3. Comparison on basis of course load and effort \n 4. Relevance to career goals \n and much more ... ";
  


    return (
    
    <div className={styles.container}>
      <div className={styles.heading}> Feedback </div> 
   
      <div className={styles.contents}>
        <div style={{ position: 'relative' }}>
          <button onClick={handleDropdownToggle} className={styles.dropdown}>
            {selectedCourse || 'Select Course'}
            {isDropdownOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
            
          </button>
          {isDropdownOpen && (
            <div style={{ top: '100%', left: 0, overflowY: 'auto',  width: '90%', border: '1px solid #ccc', maxHeight: '200px',  borderRadius: '5px' }}>
              {courses.map(course => (
                <div key={course} onClick={() => handleCourseSelect(course)} style={{ padding: '5px', cursor: 'pointer' }}>
                  {course}
                </div>
              ))}
            </div>
          )}
        </div>
      
      <div className={styles.ratingContainer}>
          <div className={styles.ratingText}>Course Load:</div>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`${styles.star} ${
                rating <= selectedRating1 ? styles.selected : ""
              }`}
              onClick={() => handleRatingClick(rating, 1)}
            >
              <FaRegStar/>
            </button>
          ))}
        </div>


        <div className={styles.ratingContainer}>
          <div className={styles.ratingText}>Course Difficulty:</div>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              
              className={`${styles.star} ${
                rating <= selectedRating2 ? styles.selected : ""
              }`}

              onClick={() => handleRatingClick(rating, 2)}
            >
              <FaRegStar/>
            </button>
          ))}
        </div>
        </div>
      
      <form onSubmit={handleSubmit} 
      className={styles.form}>

        <input
          type="hidden"
          placeholder=""
          name="courseLoad"
          required
          value={selectedRating1}
        ></input>
        <input
          type="hidden"
          placeholder=""
          name="courseDifficulty"
          required
          value={selectedRating2}
        ></input>
        <input
          type="hidden"
          placeholder=""
          name="courseName"
          required
          value={selectedCourse}
        ></input>
        


        <input
          type="text"
          placeholder={feedbackPlaceholder}
          name="courseFeedback"
        ></input>

        <button className={styles.button} type="submit" > Submit </button>
        {/* {uploadStatus === 'success' && <p>PDF uploaded successfully!</p>}
        {uploadStatus === 'error' && <p>Failed to upload PDF. Please try again.</p>} */}
      </form>
      {showSuccessMessage && (
        <div className={styles.success}>
          Your feedback has been submitted successfully!
        </div>
      )}
    </div>
    // <div className={styles.container}>

    // </div>
  );
};

export default FeedbackPage;
