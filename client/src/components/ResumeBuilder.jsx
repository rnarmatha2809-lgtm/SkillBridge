
import React, { useState } from 'react';

function ResumeBuilder({ onBack }) {
  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    careerObjective: '',
    education: '',
    skills: '',
    projects: '',
    experience: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      maxWidth: '950px',
      margin: '30px auto',
      padding: '25px'
    }}>
      <button onClick={onBack}>← Back to Dashboard</button>

      <h1>Resume Builder</h1>
      <p>Create your professional resume using SkillBridge.</p>

      {!showPreview ? (
        <div style={{
          background: '#fff',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}>
          <h2>Personal Information</h2>

          <input
            name="name"
            placeholder="Full Name"
            value={resume.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={resume.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={resume.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <h2>Career Objective</h2>
          <textarea
            name="careerObjective"
            placeholder="Write a short career objective..."
            value={resume.careerObjective}
            onChange={handleChange}
            style={inputStyle}
          />

          <h2>Education</h2>
          <textarea
            name="education"
            placeholder="Enter your degree, college and graduation year..."
            value={resume.education}
            onChange={handleChange}
            style={inputStyle}
          />

          <h2>Technical Skills</h2>
          <textarea
            name="skills"
            placeholder="Example: HTML, CSS, JavaScript, React..."
            value={resume.skills}
            onChange={handleChange}
            style={inputStyle}
          />

          <h2>Projects</h2>
          <textarea
            name="projects"
            placeholder="Describe your academic or personal projects..."
            value={resume.projects}
            onChange={handleChange}
            style={inputStyle}
          />

          <h2>Work Experience</h2>
          <textarea
            name="experience"
            placeholder="Enter internships or work experience. If none, enter Fresher."
            value={resume.experience}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            onClick={() => setShowPreview(true)}
            style={buttonStyle}
          >
            Preview Resume
          </button>
        </div>
      ) : (
        <div>
          <div id="resume-preview" className="resume-paper" style={previewStyle}>
            <h1>{resume.name || 'Your Name'}</h1>
            <p>{resume.email} {resume.phone && ` | ${resume.phone}`}</p>

            <hr />

            <h2>Career Objective</h2>
            <p>{resume.careerObjective}</p>

            <h2>Education</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.education}</p>

            <h2>Technical Skills</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.skills}</p>

            <h2>Projects</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.projects}</p>

            <h2>Work Experience</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.experience}</p>
          </div>

          <button
            onClick={() => setShowPreview(false)}
            style={buttonStyle}
          >
            Edit Resume
          </button>

          <button
            onClick={handlePrint}
            style={{ ...buttonStyle, marginLeft: '10px' }}
          >
            Download / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  margin: '10px 0 20px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '15px'
};

const buttonStyle = {
  background: '#3157d5',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '15px'
};

const previewStyle = {
  background: '#fff',
  color: '#222',
  padding: '40px',
  margin: '20px 0',
  border: '1px solid #ddd',
  borderRadius: '8px',
  lineHeight: '1.6'
};

export default ResumeBuilder;
