import React, { useState } from 'react';
import './App.css';

import StudentDashboard from './components/StudentDashboard';
import ProfileSkills from './components/ProfileSkills';
import Jobs from './components/Jobs';
import AdminDashboard from './components/AdminDashboard';
import ApplicationTracking from './components/ApplicationTracking';
import CourseRecommendations from './components/CourseRecommendations';
import SkillAssessment from './components/SkillAssessment';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import ResumeBuilder from './components/ResumeBuilder';

// Render Backend API URL
const API_BASE = 'https://skillbridge-backend-skw3.onrender.com/api';

function App() {
  const [page, setPage] = useState(() => {
    const token = localStorage.getItem('skillbridgeToken');
    const student = localStorage.getItem('skillbridgeStudent');

    if (token && student) {
      try {
        const savedStudent = JSON.parse(student);

        if (savedStudent.role === 'admin') {
          return 'admin';
        }

        return 'dashboard';
      } catch (error) {
        return 'home';
      }
    }

    return 'home';
  });

  const [role, setRole] = useState('student');
  const [assessmentRole, setAssessmentRole] = useState('Frontend Developer');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    graduationYear: ''
  });

  const handleNavigation = (destination) => {
    setPage(destination);
    setMessage('');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('skillbridgeToken');
    localStorage.removeItem('skillbridgeStudent');

    setPage('home');
    setMessage('');

    setLoginData({
      email: '',
      password: ''
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage('Registration successful! Please log in.');

      setRegisterData({
        name: '',
        email: '',
        password: '',
        department: '',
        graduationYear: ''
      });

    } catch (error) {
      setMessage(error.message || 'Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.student || data.student.role !== role) {
        throw new Error('Selected login role does not match your account.');
      }

      localStorage.setItem('skillbridgeToken', data.token);

      localStorage.setItem(
        'skillbridgeStudent',
        JSON.stringify(data.student)
      );

      if (data.student.role === 'admin') {
        setPage('admin');
      } else {
        setPage('dashboard');
      }

      setMessage('');

    } catch (error) {
      setMessage(error.message || 'Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Get the currently logged-in student
  const currentStudent = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('skillbridgeStudent') || '{}'
      );
    } catch (error) {
      return {};
    }
  })();

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={() => handleNavigation('home')}>
          <span className="logo-icon">S</span>
          SkillBridge
        </div>

        <div className="nav-links">
          <a onClick={() => handleNavigation('home')}>Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-buttons">
          <button
            className="login-btn"
            onClick={() => handleNavigation('login')}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => handleNavigation('register')}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HOME PAGE */}
      {page === 'home' && (
        <>
          <section className="hero">
            <div className="hero-content">
              <div className="tagline">
                YOUR FUTURE STARTS HERE
              </div>

              <h1>
                Bridge the Gap Between
                <span> Skills and Success.</span>
              </h1>

              <p>
                Discover your skills, identify what you are missing,
                learn what employers need, and find opportunities
                that move your career forward.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => handleNavigation('register')}
                >
                  Get Started Free →
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => handleNavigation('login')}
                >
                  Explore Platform
                </button>
              </div>

              <div className="hero-stats">
                <div>
                  <h3>Smart</h3>
                  <p>Skill Analysis</p>
                </div>

                <div>
                  <h3>Personalized</h3>
                  <p>Learning Paths</p>
                </div>

                <div>
                  <h3>Career</h3>
                  <p>Opportunities</p>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="dashboard-card">
                <div className="dashboard-heading">
                  <div>
                    <small>YOUR CAREER DASHBOARD</small>
                    <h2>Welcome, Student!</h2>
                  </div>

                  <span className="profile-icon">S</span>
                </div>

                <div className="progress-card">
                  <p>Career Readiness</p>
                  <h1>75%</h1>

                  <div className="progress-track">
                    <div className="progress-fill"></div>
                  </div>

                  <small>Keep learning and growing!</small>
                </div>

                <h3 className="skill-heading">Your Current Skills</h3>

                <div className="skill-tags">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>MongoDB</span>
                  <span>Python</span>
                </div>

                <div className="recommendation">
                  <span>✦</span>

                  <div>
                    <strong>Your Next Step</strong>
                    <p>Explore skills required for your dream job.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="features-section" id="features">
            <div className="section-heading">
              <span>WHAT WE OFFER</span>
              <h2>Everything You Need to Become Job-Ready</h2>
              <p>
                One platform to discover, develop and demonstrate your skills.
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Skill Gap Analysis</h3>
                <p>
                  Discover the skills you have and identify the skills employers expect.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💼</div>
                <h3>Jobs & Internships</h3>
                <p>
                  Find relevant career opportunities based on your current skills.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Course Recommendations</h3>
                <p>
                  Get learning suggestions to improve your skills and career readiness.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📄</div>
                <h3>Resume Builder</h3>
                <p>
                  Create a professional resume and showcase your abilities.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3>Mentor Matching</h3>
                <p>
                  Discover mentors who can guide your professional development.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Application Tracking</h3>
                <p>
                  Monitor your job and internship applications in one place.
                </p>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="about-section" id="about">
            <span>ABOUT SKILLBRIDGE</span>

            <h2>
              Qualifications Get You Started. Skills Take You Further.
            </h2>

            <p>
              SkillBridge helps students move from academic knowledge
              to industry-ready skills through personalized analysis,
              relevant learning resources and career opportunities.
            </p>

            <button
              className="primary-btn"
              onClick={() => handleNavigation('register')}
            >
              Join SkillBridge →
            </button>
          </section>
        </>
      )}

      {/* STUDENT DASHBOARD */}
      {page === 'dashboard' && (
        <StudentDashboard
          student={currentStudent}
          onProfileClick={() => handleNavigation('profile')}
          onJobsClick={() => handleNavigation('jobs')}
          onApplicationsClick={() => handleNavigation('applications')}
          onCoursesClick={() => handleNavigation('courses')}
          onAssessmentClick={() => handleNavigation('assessment')}
          onSkillGapClick={() => handleNavigation('skillgap')}
          onResumeClick={() => handleNavigation('resume')}
          onLogout={handleLogout}
        />
      )}

      {/* PROFILE AND SKILLS */}
      {page === 'profile' && (
        <ProfileSkills
          onBack={() => handleNavigation('dashboard')}
        />
      )}

      {/* JOBS AND INTERNSHIPS */}
      {page === 'jobs' && (
        <Jobs
          onBack={() => handleNavigation('dashboard')}
        />
      )}

      {/* APPLICATION TRACKING */}
      {page === 'applications' && (
        <ApplicationTracking
          onBack={() => handleNavigation('dashboard')}
        />
      )}

      {/* COURSE RECOMMENDATIONS */}
      {page === 'courses' && (
        <CourseRecommendations
          student={currentStudent}
          onBack={() => handleNavigation('dashboard')}
        />
      )}

      {/* ROLE-BASED SKILL ASSESSMENT */}
      {page === 'assessment' && (
        <SkillAssessment
          selectedRole={assessmentRole}
          onBack={() => handleNavigation('dashboard')}
        />
      )}

      {/* SKILL GAP ANALYSIS */}
      {page === 'skillgap' && (
        <SkillGapAnalysis
          onBack={() => handleNavigation('dashboard')}
          onStartAssessment={(selectedRole) => {
            setAssessmentRole(selectedRole);
            handleNavigation('assessment');
          }}
        />
      )}

      {/* RESUME BUILDER */}
      {page === 'resume' && (
        <ResumeBuilder
          onBack={() => handleNavigation('dashboard')}
        />
      )}

      {/* ADMIN DASHBOARD */}
      {page === 'admin' && (
        <AdminDashboard
          admin={currentStudent}
          onLogout={handleLogout}
        />
      )}

      {/* LOGIN PAGE */}
      {page === 'login' && (
        <section className="auth-section">
          <div className="auth-card">
            <div className="logo auth-logo">
              <span className="logo-icon">S</span>
              SkillBridge
            </div>

            <h2>Welcome Back!</h2>
            <p>Log in to continue your career journey.</p>

            <label>Login As</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>

            <form onSubmit={handleLogin}>
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => setLoginData({
                  ...loginData,
                  email: e.target.value
                })}
                required
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({
                  ...loginData,
                  password: e.target.value
                })}
                required
              />

              {message && <p role="status">{message}</p>}

              <button
                className="primary-btn full-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?
              <a onClick={() => handleNavigation('register')}>
                {' '}Register
              </a>
            </p>

            <a
              className="back-link"
              onClick={() => handleNavigation('home')}
            >
              ← Back to Home
            </a>
          </div>
        </section>
      )}

      {/* REGISTRATION PAGE */}
      {page === 'register' && (
        <section className="auth-section">
          <div className="auth-card">
            <div className="logo auth-logo">
              <span className="logo-icon">S</span>
              SkillBridge
            </div>

            <h2>Create Your Account</h2>
            <p>Start building your career with SkillBridge.</p>

            <form onSubmit={handleRegister}>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={registerData.name}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  name: e.target.value
                })}
                required
              />

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  email: e.target.value
                })}
                required
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                minLength="6"
                value={registerData.password}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  password: e.target.value
                })}
                required
              />

              <label>Department</label>

              <input
                type="text"
                placeholder="e.g. Information Technology"
                value={registerData.department}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  department: e.target.value
                })}
                required
              />

              <label>Graduation Year</label>

              <input
                type="number"
                placeholder="e.g. 2028"
                value={registerData.graduationYear}
                onChange={(e) => setRegisterData({
                  ...registerData,
                  graduationYear: e.target.value
                })}
                required
              />

              {message && <p role="status">{message}</p>}

              <button
                className="primary-btn full-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?
              <a onClick={() => handleNavigation('login')}>
                {' '}Login
              </a>
            </p>

            <a
              className="back-link"
              onClick={() => handleNavigation('home')}
            >
              ← Back to Home
            </a>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <h3>SkillBridge</h3>
        <p>Connecting Skills. Creating Opportunities.</p>
        <small>
          © 2026 SkillBridge – Youth Employability Platform
        </small>
      </footer>

    </div>
  );
}

export default App;
