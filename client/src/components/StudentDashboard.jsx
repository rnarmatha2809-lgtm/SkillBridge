
import React from 'react';
import './StudentDashboard.css';

function StudentDashboard({
  student,
  onLogout,
  onProfileClick,
  onJobsClick,
  onApplicationsClick,
  onAssessmentClick,
  onCoursesClick,
  onSkillGapClick,
  onResumeClick
})  {
  const studentName = student?.name || 'Student';

  return (
    <div className="student-dashboard">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <h2>SkillBridge</h2>

        <nav>
          <a className="active">Dashboard</a>

          <a href="#" onClick={(e) => {
            e.preventDefault();
            onProfileClick();
          }}>
            My Profile
          </a>

          <a href="#" onClick={(e) => {
            e.preventDefault();
            onProfileClick();
          }}>
            My Skills
          </a>

          <a href="#" onClick={(e) => {
            e.preventDefault();
            onJobsClick();
          }}>
            Jobs & Internships
          </a>

          <a href="#" onClick={(e) => {
            e.preventDefault();
            onCoursesClick();
          }}>
            Courses
          </a>

          <a href="#" onClick={(e) => {
            e.preventDefault();
            onApplicationsClick();
          }}>
            My Applications
          </a>
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        <header className="dashboard-topbar">
          <div>
            <h1>Student Dashboard</h1>
            <p>Welcome to your career development space.</p>
          </div>

          <div className="dashboard-user">
            <span>{studentName.charAt(0).toUpperCase()}</span>
            <strong>{studentName}</strong>
          </div>
        </header>

        <section className="welcome-banner">
          <div>
            <h2>Welcome, {studentName}!</h2>
            <p>
              Your journey towards becoming industry-ready starts here.
              Build your skills and explore opportunities.
            </p>
          </div>
          <div className="welcome-icon">🚀</div>
        </section>

        {/* PROFILE */}
        <section className="profile-section">
          <h2>My Profile</h2>

          <div className="profile-card">
            <div className="profile-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div className="profile-details">
              <h3>{studentName}</h3>
              <p>{student?.email}</p>
              <p>{student?.department}</p>
              <p>Graduation Year: {student?.graduationYear}</p>
            </div>
          </div>
        </section>

        {/* QUICK ACCESS */}
        <section className="dashboard-section">
          <h2>Explore SkillBridge</h2>

          <div className="dashboard-grid">

            <div className="dashboard-card-item" onClick={onSkillGapClick}
  style={{ cursor: 'pointer' }}>
              <span>🎯</span>
              <h3>Skill Gap Analysis</h3>
              <p>Identify the skills you need to improve.</p>
            </div>

            <div
              className="dashboard-card-item"
              onClick={onJobsClick}
              style={{ cursor: 'pointer' }}
            >
              <span>💼</span>
              <h3>Jobs & Internships</h3>
              <p>Discover opportunities matching your interests.</p>
            </div>

            {/* COURSES CARD */}
            <div
              className="dashboard-card-item"
              onClick={onCoursesClick}
              style={{ cursor: 'pointer' }}
            >
              <span>📚</span>
              <h3>Course Recommendations</h3>
              <p>Explore courses recommended for your skills.</p>
            </div>
            <div
  className="dashboard-card-item"
  onClick={onAssessmentClick}
  style={{ cursor: 'pointer' }}
>
  <span>📝</span>
  <h3>Skill Assessment</h3>
  <p>Test your technical knowledge and discover areas to improve.</p>
</div>

            <div className="dashboard-card-item" onClick={onResumeClick}
style={{ cursor: 'pointer' }}>
              <span>📄</span>
              <h3>Resume Builder</h3>
              <p>Prepare your professional resume.</p>
            </div>

            <div className="dashboard-card-item">
              <span>🤝</span>
              <h3>Mentor Matching</h3>
              <p>Connect with experienced mentors.</p>
            </div>

            <div
              className="dashboard-card-item"
              onClick={onApplicationsClick}
              style={{ cursor: 'pointer' }}
            >
              <span>📈</span>
              <h3>My Applications</h3>
              <p>Track your job and internship applications.</p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default StudentDashboard;
