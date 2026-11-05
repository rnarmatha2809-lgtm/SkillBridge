import React, { useMemo } from 'react';

function CourseRecommendations({ student, onBack }) {

    // Get student skills safely
    const skills = Array.isArray(student?.skills)
        ? student.skills
        : [];

    // Available courses
    const courseData = [
        {
            skill: 'React',
            title: 'React.js for Beginners',
            description: 'Learn to build interactive user interfaces.',
            link: 'https://www.freecodecamp.org/learn/front-end-development-libraries/'
        },
        {
            skill: 'JavaScript',
            title: 'JavaScript Complete Course',
            description: 'Learn JavaScript fundamentals and advanced concepts.',
            link: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/'
        },
        {
            skill: 'MongoDB',
            title: 'MongoDB Fundamentals',
            description: 'Learn database management using MongoDB.',
            link: 'https://learn.mongodb.com/'
        },
        {
            skill: 'Node.js',
            title: 'Node.js for Beginners',
            description: 'Learn backend development using Node.js.',
            link: 'https://nodejs.org/en/learn'
        },
        {
            skill: 'Express',
            title: 'Express.js Tutorial',
            description: 'Learn to create backend APIs.',
            link: 'https://expressjs.com/en/starter/installing.html'
        }
    ];

    // Find courses for skills the student has not learned
    const recommendations = useMemo(() => {

        const studentSkills = new Set(
            skills
                .filter(skill => typeof skill === 'string')
                .map(skill => skill.trim().toLowerCase())
        );

        return courseData.filter(course =>
            !studentSkills.has(course.skill.toLowerCase())
        );

    }, [skills]);

    return (
        <div style={styles.page}>

            <div style={styles.container}>

                <button
                    onClick={onBack}
                    type="button"
                    style={styles.backButton}
                >
                    ← Back to Dashboard
                </button>

                <h1 style={styles.heading}>
                    Recommended Courses
                </h1>

                <p style={styles.subtitle}>
                    Courses selected based on the skills in your profile.
                </p>

                {recommendations.length === 0 ? (

                    <div style={styles.empty}>
                        <h3>Great Job!</h3>
                        <p>
                            No new recommendations available right now.
                            Keep improving your existing skills!
                        </p>
                    </div>

                ) : (

                    <div>

                        {recommendations.map((course) => (

                            <div
                                key={course.skill}
                                style={styles.courseCard}
                            >

                                <h3>{course.title}</h3>

                                <p>{course.description}</p>

                                <p>
                                    Related skill:{' '}
                                    <strong>{course.skill}</strong>
                                </p>

                                <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.link}
                                >
                                    Explore Course →
                                </a>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

// Styles
const styles = {

    page: {
        padding: '30px',
        minHeight: '100vh',
        background: '#f5f7fb'
    },

    container: {
        maxWidth: '1000px',
        margin: 'auto'
    },

    heading: {
        color: '#243b6b',
        fontSize: '32px'
    },

    subtitle: {
        color: '#666',
        marginBottom: '25px'
    },

    backButton: {
        padding: '10px 18px',
        marginBottom: '20px',
        border: 'none',
        background: '#243b6b',
        color: 'white',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px'
    },

    courseCard: {
        border: '1px solid #ddd',
        padding: '20px',
        marginBottom: '15px',
        borderRadius: '10px',
        background: 'white',
        boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
    },

    link: {
        color: '#2563eb',
        fontWeight: 'bold',
        textDecoration: 'none'
    },

    empty: {
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        textAlign: 'center'
    }

};

export default CourseRecommendations;
