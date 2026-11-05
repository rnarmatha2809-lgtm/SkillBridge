import React, { useEffect, useState } from 'react';

// Render Backend API URL
const API_BASE = 'https://skillbridge-backend-skw3.onrender.com/api';

function ProfileSkills({ onBack }) {

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        department: '',
        graduationYear: '',
        careerGoal: '',
        skills: []
    });

    const [newSkill, setNewSkill] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const token = localStorage.getItem('skillbridgeToken');

    // Common API headers
    const getHeaders = (json = false) => ({
        ...(json ? { 'Content-Type': 'application/json' } : {}),
        Authorization: `Bearer ${token}`
    });

    // Safe JSON response
    const getData = async (response) => {
        try {
            return await response.json();
        } catch {
            return {};
        }
    };

    // Fetch profile
    const fetchProfile = async () => {
        if (!token) {
            setMessage('Please login again. Authentication token not found.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/profile`, {
                method: 'GET',
                headers: getHeaders()
            });

            const data = await getData(response);

            if (!response.ok) {
                throw new Error(data.message || 'Unable to load profile');
            }

            const student = data.student || data;

            setProfile({
                name: student.name || '',
                email: student.email || '',
                department: student.department || '',
                graduationYear: student.graduationYear || '',
                careerGoal: student.careerGoal || '',
                skills: Array.isArray(student.skills)
                    ? student.skills
                    : []
            });

        } catch (error) {
            setMessage(error.message || 'Unable to load profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Update profile
    const updateProfile = async (e) => {
        e.preventDefault();

        setSaving(true);
        setMessage('');

        try {
            const response = await fetch(`${API_BASE}/profile`, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify({
                    name: profile.name,
                    department: profile.department,
                    graduationYear: Number(profile.graduationYear),
                    careerGoal: profile.careerGoal
                })
            });

            const data = await getData(response);

            if (!response.ok) {
                throw new Error(data.message || 'Profile update failed');
            }

            const student = data.student || data;

            setProfile(prev => ({
                ...prev,
                ...student,
                careerGoal: student.careerGoal || '',
                skills: student.skills || prev.skills
            }));

            localStorage.setItem(
                'skillbridgeStudent',
                JSON.stringify(student)
            );

            setMessage('Profile updated successfully!');

        } catch (error) {
            setMessage(error.message || 'Profile update failed');
        } finally {
            setSaving(false);
        }
    };

    // Add skill
    const addSkill = async (e) => {
        e.preventDefault();

        const skill = newSkill.trim();

        if (!skill) {
            setMessage('Please enter a skill.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/skills`, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify({ skill })
            });

            const data = await getData(response);

            if (!response.ok) {
                throw new Error(data.message || 'Unable to add skill');
            }

            setProfile(prev => ({
                ...prev,
                skills: data.skills || [...prev.skills, skill]
            }));

            setNewSkill('');
            setMessage('Skill added successfully!');

        } catch (error) {
            setMessage(error.message || 'Unable to add skill');
        }
    };

    // Remove skill
    const removeSkill = async (skill) => {
        try {
            const response = await fetch(
                `${API_BASE}/skills/${encodeURIComponent(skill)}`,
                {
                    method: 'DELETE',
                    headers: getHeaders()
                }
            );

            const data = await getData(response);

            if (!response.ok) {
                throw new Error(data.message || 'Unable to remove skill');
            }

            setProfile(prev => ({
                ...prev,
                skills: data.skills || prev.skills.filter(
                    item => item !== skill
                )
            }));

            setMessage('Skill removed successfully!');

        } catch (error) {
            setMessage(error.message || 'Unable to remove skill');
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div style={styles.container}>

            <button
                style={styles.backButton}
                onClick={onBack}
                type="button"
            >
                ← Back to Dashboard
            </button>

            <h1>My Profile & Skills</h1>

            <p>
                Manage your personal information, career goal and technical skills.
            </p>

            {message && (
                <p style={styles.message}>
                    {message}
                </p>
            )}

            {/* Personal Information */}
            <div style={styles.card}>

                <h2>Personal Information</h2>

                <form onSubmit={updateProfile}>

                    <label>Full Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                name: e.target.value
                            })
                        }
                        required
                    />

                    <label>Email Address</label>
                    <input
                        style={styles.input}
                        type="email"
                        value={profile.email}
                        disabled
                    />

                    <label>Department</label>
                    <input
                        style={styles.input}
                        type="text"
                        value={profile.department}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                department: e.target.value
                            })
                        }
                        required
                    />

                    <label>Graduation Year</label>
                    <input
                        style={styles.input}
                        type="number"
                        min="2020"
                        max="2040"
                        value={profile.graduationYear}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                graduationYear: e.target.value
                            })
                        }
                        required
                    />

                    <label>Career Goal</label>
                    <select
                        style={styles.input}
                        value={profile.careerGoal}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                careerGoal: e.target.value
                            })
                        }
                        required
                    >
                        <option value="">Select your career goal</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Java Developer">Java Developer</option>
                        <option value="Python Developer">Python Developer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                        <option value="Cloud Engineer">Cloud Engineer</option>
                        <option value="Other">Other</option>
                    </select>

                    <button
                        style={styles.button}
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>

                </form>
            </div>

            {/* Skills Section */}
            <div style={styles.card}>

                <h2>My Skills</h2>

                <p>Add the technical skills you currently know.</p>

                <form onSubmit={addSkill} style={styles.skillForm}>

                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Example: React, Python, Java"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />

                    <button
                        style={styles.button}
                        type="submit"
                    >
                        Add Skill
                    </button>

                </form>

                <div style={styles.skillList}>

                    {profile.skills.length === 0 ? (
                        <p>No skills added yet.</p>
                    ) : (
                        profile.skills.map((skill, index) => (

                            <div key={index} style={styles.skill}>

                                <span>{skill}</span>

                                <button
                                    style={styles.removeButton}
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                >
                                    Remove
                                </button>

                            </div>
                        ))
                    )}

                </div>
            </div>

        </div>
    );
}

// CSS Styles
const styles = {

    container: {
        padding: '35px',
        maxWidth: '900px',
        margin: 'auto',
        color: '#222'
    },

    backButton: {
        padding: '10px 16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '20px'
    },

    card: {
        background: '#fff',
        padding: '25px',
        marginTop: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    },

    input: {
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px',
        margin: '8px 0 18px',
        border: '1px solid #ccc',
        borderRadius: '6px'
    },

    button: {
        background: '#3157d5',
        color: '#fff',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '6px',
        cursor: 'pointer'
    },

    message: {
        background: '#e8f5e9',
        padding: '12px',
        borderRadius: '6px'
    },

    skillForm: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
    },

    skillList: {
        marginTop: '20px'
    },

    skill: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        marginTop: '10px',
        background: '#f3f5fa',
        borderRadius: '6px'
    },

    removeButton: {
        background: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default ProfileSkills;
