import React, { useEffect, useState } from 'react';

function SkillGapAnalysis({ onBack, onStartAssessment }) {

    const [studentSkills, setStudentSkills] = useState([]);
    const [selectedRole, setSelectedRole] = useState('Frontend Developer');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const roles = [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'Python Developer',
        'Software Developer',
        'Java Developer',
        'Data Analyst',
        'Data Scientist',
        'UI/UX Designer',
        'DevOps Engineer'
    ];

    // FETCH SKILL GAP ANALYSIS
    const fetchAnalysis = async (role) => {

        setLoading(true);
        setMessage('');
        setAnalysis(null);

        try {

            const token = localStorage.getItem('skillbridgeToken');

            if (!token) {
                throw new Error('Please login again.');
            }

            const response = await fetch(
                '/api/skill-gap?role=' + encodeURIComponent(role),
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Analysis failed.');
            }

            setAnalysis(data);
            setStudentSkills(data.currentSkills || []);

        } catch (error) {

            console.error('Skill gap error:', error);
            setMessage(error.message || 'Unable to analyze skills.');

        } finally {

            setLoading(false);

        }
    };

    // FETCH ANALYSIS WHEN ROLE CHANGES
    useEffect(() => {
        fetchAnalysis(selectedRole);
    }, [selectedRole]);

    // START ASSESSMENT
    const handleStartAssessment = () => {

        if (onStartAssessment) {
            onStartAssessment(selectedRole);
        }

    };

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                <button
                    style={styles.backButton}
                    onClick={onBack}
                >
                    ← Back to Dashboard
                </button>

                <h1 style={styles.heading}>
                    Skill Gap Analysis
                </h1>

                <p style={styles.subtitle}>
                    Discover which skills you already have
                    and which skills you need to develop
                    for your selected career.
                </p>

                <div style={styles.card}>

                    <label style={styles.label}>
                        Select Your Career Role
                    </label>

                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        style={styles.select}
                    >

                        {roles.map(role => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}

                    </select>

                    {loading ? (

                        <p>Analyzing your skills...</p>

                    ) : message ? (

                        <p style={styles.error}>{message}</p>

                    ) : analysis && (

                        <>

                            <h2 style={styles.sectionHeading}>
                                Your Career Readiness
                            </h2>

                            <div style={styles.progressHeader}>

                                <strong>
                                    {analysis.percentage}%
                                </strong>

                                <span>
                                    {analysis.matchedSkills.length}
                                    {' '}of{' '}
                                    {analysis.requiredSkills.length}
                                    {' '}skills matched
                                </span>

                            </div>

                            <div style={styles.progressTrack}>

                                <div
                                    style={{
                                        ...styles.progressFill,
                                        width: analysis.percentage + '%'
                                    }}
                                />

                            </div>

                            {/* SKILLS YOU HAVE */}

                            <div style={styles.skillSection}>

                                <h3 style={styles.greenHeading}>
                                    ✓ Skills You Have
                                </h3>

                                {analysis.matchedSkills.length > 0 ? (

                                    <div style={styles.skillList}>

                                        {analysis.matchedSkills.map(skill => (
                                            <span
                                                key={skill}
                                                style={styles.matchedSkill}
                                            >
                                                {skill}
                                            </span>
                                        ))}

                                    </div>

                                ) : (

                                    <p>No matching skills found yet.</p>

                                )}

                            </div>

                            {/* SKILLS TO LEARN */}

                            <div style={styles.skillSection}>

                                <h3 style={styles.redHeading}>
                                    ✗ Skills You Need to Learn
                                </h3>

                                {analysis.missingSkills.length > 0 ? (

                                    <div style={styles.skillList}>

                                        {analysis.missingSkills.map(skill => (
                                            <span
                                                key={skill}
                                                style={styles.missingSkill}
                                            >
                                                {skill}
                                            </span>
                                        ))}

                                    </div>

                                ) : (

                                    <p>
                                        Excellent! You have all
                                        the required skills.
                                    </p>

                                )}

                            </div>

                            {/* ASSESSMENT */}

                            <div style={styles.assessmentBox}>

                                <h2>Test Your Skills</h2>

                                <p>
                                    Take a role-specific assessment
                                    to evaluate your knowledge.
                                </p>

                                <button
                                    style={styles.assessmentButton}
                                    onClick={handleStartAssessment}
                                >
                                    Start {selectedRole} Assessment →
                                </button>

                            </div>

                        </>

                    )}

                </div>

            </div>

        </div>

    );

}

// ==========================================
// COMPONENT STYLES
// ==========================================

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

    card: {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 3px 12px rgba(0,0,0,0.08)'
    },

    label: {
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold'
    },

    select: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '25px'
    },

    sectionHeading: {
        marginTop: '25px'
    },

    progressHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },

    progressTrack: {
        height: '12px',
        background: '#e5e7eb',
        borderRadius: '10px',
        overflow: 'hidden'
    },

    progressFill: {
        height: '100%',
        background: '#16a34a',
        transition: 'width 0.3s'
    },

    skillSection: {
        marginTop: '30px'
    },

    greenHeading: {
        color: '#15803d'
    },

    redHeading: {
        color: '#dc2626'
    },

    skillList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
    },

    matchedSkill: {
        background: '#dcfce7',
        color: '#166534',
        padding: '9px 15px',
        borderRadius: '20px'
    },

    missingSkill: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '9px 15px',
        borderRadius: '20px'
    },

    assessmentBox: {
        marginTop: '35px',
        padding: '20px',
        background: '#eff6ff',
        borderRadius: '10px'
    },

    assessmentButton: {
        background: '#2563eb',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
    },

    backButton: {
        padding: '10px 18px',
        marginBottom: '20px',
        border: 'none',
        background: '#243b6b',
        color: 'white',
        borderRadius: '6px',
        cursor: 'pointer'
    },

    error: {
        color: 'red'
    }

};

export default SkillGapAnalysis;