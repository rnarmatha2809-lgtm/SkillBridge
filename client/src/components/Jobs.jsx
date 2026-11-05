import React, { useEffect, useState } from 'react';

// Render Backend API URL
const API_BASE = 'https://skillbridge-backend-skw3.onrender.com/api';

function Jobs({ onBack }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [applyingJob, setApplyingJob] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);

    const token = localStorage.getItem('skillbridgeToken');

    useEffect(() => {
        fetchJobs();
        fetchMyApplications();
    }, []);

    // Fetch jobs from MongoDB
    const fetchJobs = async () => {
        try {
            const response = await fetch(`${API_BASE}/jobs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setJobs(Array.isArray(data) ? data : data.jobs || []);
            } else {
                setMessage(data.message || 'Unable to fetch opportunities');
            }
        } catch (error) {
            setMessage('Unable to connect to server');
        } finally {
            setLoading(false);
        }
    };

    // Fetch applications already submitted by this student
    const fetchMyApplications = async () => {
        try {
            const response = await fetch(`${API_BASE}/applications/my`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && Array.isArray(data)) {
                setAppliedJobs(
                    data.map(application => application.job?._id)
                );
            }
        } catch (error) {
            console.error('Unable to fetch applications:', error);
        }
    };

    // Apply for a job or internship
    const handleApply = async (jobId) => {
        setApplyingJob(jobId);
        setMessage('');

        try {
            const response = await fetch(`${API_BASE}/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ jobId })
            });

            const data = await response.json();

            if (response.ok) {
                setAppliedJobs(previous => [...previous, jobId]);
                setMessage('Application submitted successfully!');
            } else {
                setMessage(data.message || 'Unable to submit application');
            }
        } catch (error) {
            setMessage('Unable to connect to server');
        } finally {
            setApplyingJob(null);
        }
    };

    return (
        <div style={styles.container}>

            <button
                onClick={onBack}
                style={styles.backButton}
                type="button"
            >
                ← Back to Dashboard
            </button>

            <h1>Jobs & Internships</h1>

            <p>
                Explore opportunities and find the right career path for you.
            </p>

            {loading && <p>Loading opportunities...</p>}

            {message && (
                <p style={styles.message}>{message}</p>
            )}

            {!loading && jobs.length === 0 && (
                <div style={styles.empty}>
                    <h3>No opportunities available yet</h3>
                    <p>New jobs and internships will appear here.</p>
                </div>
            )}

            <div style={styles.grid}>
                {jobs.map((job) => {
                    const alreadyApplied = appliedJobs.includes(job._id);

                    return (
                        <div key={job._id} style={styles.card}>

                            <span style={styles.type}>
                                {job.type}
                            </span>

                            <h2>{job.title}</h2>

                            <h4>{job.company}</h4>

                            <p>{job.description}</p>

                            <p>
                                <strong>Location:</strong> {job.location}
                            </p>

                            <p>
                                <strong>Salary/Stipend:</strong> {job.salary}
                            </p>

                            <p>
                                <strong>Required Skills:</strong>{' '}
                                {job.skillsRequired?.join(', ') || 'Not specified'}
                            </p>

                            <p>
                                <strong>Last Date:</strong>{' '}
                                {job.lastDate
                                    ? new Date(job.lastDate).toLocaleDateString()
                                    : 'Not specified'}
                            </p>

                            <button
                                onClick={() => handleApply(job._id)}
                                disabled={alreadyApplied || applyingJob === job._id}
                                style={{
                                    ...styles.applyButton,
                                    background: alreadyApplied ? '#198754' : '#3157d5',
                                    cursor: alreadyApplied ? 'default' : 'pointer'
                                }}
                            >
                                {alreadyApplied
                                    ? 'Already Applied'
                                    : applyingJob === job._id
                                        ? 'Applying...'
                                        : 'Apply Now'}
                            </button>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}

const styles = {
    container: {
        padding: '35px',
        maxWidth: '1100px',
        margin: 'auto',
        color: '#222'
    },

    backButton: {
        padding: '10px 16px',
        marginBottom: '20px',
        cursor: 'pointer'
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginTop: '30px'
    },

    card: {
        background: '#fff',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    },

    type: {
        background: '#e5ecff',
        color: '#3157d5',
        padding: '7px 12px',
        borderRadius: '20px',
        fontSize: '13px'
    },

    applyButton: {
        color: '#fff',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '7px',
        fontSize: '15px',
        marginTop: '12px'
    },

    message: {
        background: '#eaf2ff',
        padding: '12px',
        borderRadius: '7px',
        color: '#234'
    },

    empty: {
        background: '#f3f5fa',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        marginTop: '30px'
    }
};

export default Jobs;
