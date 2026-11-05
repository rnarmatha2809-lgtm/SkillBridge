import React, { useEffect, useState } from 'react';

// Render Backend API URL
const API_BASE = 'https://skillbridge-backend-skw3.onrender.com/api';

function AdminDashboard({ admin, onLogout }) {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loadingApplications, setLoadingApplications] = useState(false);
    const [updatingApplication, setUpdatingApplication] = useState('');

    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        description: '',
        type: 'Internship',
        location: '',
        skillsRequired: '',
        salary: '',
        lastDate: ''
    });

    const token = localStorage.getItem('skillbridgeToken');

    useEffect(() => {
        fetchJobs();
        fetchApplications();
    }, []);

    // Fetch all opportunities
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
                setMessage(data.message || 'Unable to load opportunities');
            }
        } catch (error) {
            setMessage('Unable to load opportunities');
        }
    };

    // Fetch all student applications
    const fetchApplications = async () => {
        setLoadingApplications(true);

        try {
            const response = await fetch(`${API_BASE}/applications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setApplications(Array.isArray(data) ? data : []);
            } else {
                setMessage(data.message || 'Unable to load applications');
            }
        } catch (error) {
            setMessage('Unable to load applications');
        } finally {
            setLoadingApplications(false);
        }
    };

    // Update application status
    const updateApplicationStatus = async (applicationId, status) => {
        setUpdatingApplication(applicationId);
        setMessage('');

        try {
            const response = await fetch(
                `${API_BASE}/applications/${applicationId}/status`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(`Application status updated to ${status}.`);

                setApplications(previousApplications =>
                    previousApplications.map(application =>
                        application._id === applicationId
                            ? { ...application, status }
                            : application
                    )
                );
            } else {
                setMessage(data.message || 'Unable to update application status');
            }
        } catch (error) {
            setMessage('Unable to update application status');
        } finally {
            setUpdatingApplication('');
        }
    };

    // Add new job or internship
    const handleAddJob = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...jobData,
                    skillsRequired: jobData.skillsRequired
                        .split(',')
                        .map(skill => skill.trim())
                        .filter(Boolean)
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Opportunity added successfully!');

                setJobData({
                    title: '',
                    company: '',
                    description: '',
                    type: 'Internship',
                    location: '',
                    skillsRequired: '',
                    salary: '',
                    lastDate: ''
                });

                setShowForm(false);
                fetchJobs();
            } else {
                setMessage(data.message || 'Unable to add opportunity');
            }
        } catch (error) {
            setMessage('Unable to add opportunity');
        }
    };

    // Delete opportunity
    const deleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this opportunity?')) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/jobs/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Opportunity deleted successfully!');
                fetchJobs();
            } else {
                setMessage(data.message || 'Unable to delete opportunity');
            }
        } catch (error) {
            setMessage('Unable to delete opportunity');
        }
    };

    const getStatusStyle = (status) => {
        if (status === 'Accepted') return styles.accepted;
        if (status === 'Rejected') return styles.rejected;
        return styles.pending;
    };

    return (
        <div style={styles.container}>

            <header style={styles.header}>
                <div>
                    <h1>SkillBridge Admin</h1>
                    <p>Manage jobs, internships and student applications.</p>
                </div>

                <button style={styles.logout} onClick={onLogout}>
                    Logout
                </button>
            </header>

            <section style={styles.welcome}>
                <h2>Welcome, {admin?.name || 'Admin'}!</h2>
                <p>Manage opportunities and help students become career-ready.</p>
            </section>

            {message && <p style={styles.message}>{message}</p>}

            {/* Dashboard statistics */}
            <section style={styles.stats}>
                <div style={styles.statCard}>
                    <h2>{jobs.length}</h2>
                    <p>Total Opportunities</p>
                </div>

                <div style={styles.statCard}>
                    <h2>{jobs.filter(job => job.type === 'Job').length}</h2>
                    <p>Jobs</p>
                </div>

                <div style={styles.statCard}>
                    <h2>{jobs.filter(job => job.type === 'Internship').length}</h2>
                    <p>Internships</p>
                </div>

                <div style={styles.statCard}>
                    <h2>{applications.length}</h2>
                    <p>Total Applications</p>
                </div>
            </section>

            {/* Manage opportunities */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2>Manage Opportunities</h2>

                    <button
                        style={styles.addButton}
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Close Form' : '+ Add Opportunity'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleAddJob} style={styles.form}>
                        <h3>Add Job / Internship</h3>

                        <input
                            style={styles.input}
                            placeholder="Job or Internship Title"
                            value={jobData.title}
                            onChange={e => setJobData({
                                ...jobData, title: e.target.value
                            })}
                            required
                        />

                        <input
                            style={styles.input}
                            placeholder="Company Name"
                            value={jobData.company}
                            onChange={e => setJobData({
                                ...jobData, company: e.target.value
                            })}
                            required
                        />

                        <textarea
                            style={styles.input}
                            placeholder="Description"
                            value={jobData.description}
                            onChange={e => setJobData({
                                ...jobData, description: e.target.value
                            })}
                            required
                        />

                        <select
                            style={styles.input}
                            value={jobData.type}
                            onChange={e => setJobData({
                                ...jobData, type: e.target.value
                            })}
                        >
                            <option value="Internship">Internship</option>
                            <option value="Job">Job</option>
                        </select>

                        <input
                            style={styles.input}
                            placeholder="Location"
                            value={jobData.location}
                            onChange={e => setJobData({
                                ...jobData, location: e.target.value
                            })}
                            required
                        />

                        <input
                            style={styles.input}
                            placeholder="Required Skills (comma separated)"
                            value={jobData.skillsRequired}
                            onChange={e => setJobData({
                                ...jobData, skillsRequired: e.target.value
                            })}
                        />

                        <input
                            style={styles.input}
                            placeholder="Salary / Stipend"
                            value={jobData.salary}
                            onChange={e => setJobData({
                                ...jobData, salary: e.target.value
                            })}
                        />

                        <label>Application Deadline</label>

                        <input
                            style={styles.input}
                            type="date"
                            value={jobData.lastDate}
                            onChange={e => setJobData({
                                ...jobData, lastDate: e.target.value
                            })}
                            required
                        />

                        <button style={styles.addButton} type="submit">
                            Save Opportunity
                        </button>
                    </form>
                )}

                <div style={styles.jobList}>
                    {jobs.length === 0 ? (
                        <p>No opportunities added yet.</p>
                    ) : (
                        jobs.map(job => (
                            <div key={job._id} style={styles.jobCard}>
                                <div>
                                    <h3>{job.title}</h3>
                                    <p>{job.company} | {job.type}</p>
                                    <p>{job.location}</p>
                                </div>

                                <button
                                    style={styles.deleteButton}
                                    onClick={() => deleteJob(job._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Manage student applications */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2>Manage Student Applications</h2>

                    <button
                        style={styles.addButton}
                        onClick={fetchApplications}
                        disabled={loadingApplications}
                    >
                        {loadingApplications ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {loadingApplications ? (
                    <p>Loading student applications...</p>
                ) : applications.length === 0 ? (
                    <div style={styles.emptyState}>
                        <h3>No Applications Yet</h3>
                        <p>
                            Student applications will appear here when students
                            apply for opportunities.
                        </p>
                    </div>
                ) : (
                    <div style={styles.applicationList}>
                        {applications.map(application => {
                            const student = application.student;
                            const job = application.job;

                            return (
                                <div
                                    key={application._id}
                                    style={styles.applicationCard}
                                >
                                    <div style={styles.applicationDetails}>
                                        <h3>
                                            {job?.title || 'Opportunity unavailable'}
                                        </h3>

                                        <p>
                                            <strong>Company:</strong>{' '}
                                            {job?.company || 'Not available'}
                                        </p>

                                        <p>
                                            <strong>Student:</strong>{' '}
                                            {student?.name || 'Unknown Student'}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{' '}
                                            {student?.email || 'Not available'}
                                        </p>

                                        <p>
                                            <strong>Applied on:</strong>{' '}
                                            {application.appliedAt
                                                ? new Date(application.appliedAt).toLocaleDateString()
                                                : 'Not available'}
                                        </p>

                                        <p>
                                            <strong>Current Status:</strong>{' '}
                                            <span style={getStatusStyle(application.status)}>
                                                {application.status || 'Pending'}
                                            </span>
                                        </p>
                                    </div>

                                    <div style={styles.statusControl}>
                                        <label>
                                            <strong>Update Status</strong>
                                        </label>

                                        <select
                                            style={styles.statusSelect}
                                            value={application.status || 'Pending'}
                                            disabled={updatingApplication === application._id}
                                            onChange={e => updateApplicationStatus(
                                                application._id,
                                                e.target.value
                                            )}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>

                                        {updatingApplication === application._id && (
                                            <small>Updating status...</small>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}

const styles = {
    container: {
        padding: '35px',
        maxWidth: '1150px',
        margin: 'auto',
        color: '#222'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px'
    },
    welcome: {
        background: '#263d78',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginTop: '25px'
    },
    logout: {
        background: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '6px',
        cursor: 'pointer'
    },
    message: {
        padding: '12px',
        background: '#e8f5e9',
        borderRadius: '6px',
        marginTop: '20px'
    },
    stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginTop: '25px'
    },
    statCard: {
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
    },
    section: {
        marginTop: '35px'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
    },
    addButton: {
        background: '#3157d5',
        color: 'white',
        border: 'none',
        padding: '12px 18px',
        borderRadius: '6px',
        cursor: 'pointer'
    },
    form: {
        background: 'white',
        padding: '25px',
        marginTop: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
    },
    input: {
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px',
        margin: '12px 0',
        border: '1px solid #ccc',
        borderRadius: '6px'
    },
    jobList: {
        marginTop: '25px'
    },
    jobCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        background: 'white',
        padding: '20px',
        marginTop: '15px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    },
    deleteButton: {
        background: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '6px',
        cursor: 'pointer'
    },
    emptyState: {
        background: 'white',
        padding: '25px',
        marginTop: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    },
    applicationList: {
        marginTop: '20px',
        display: 'grid',
        gap: '15px'
    },
    applicationCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        background: 'white',
        padding: '22px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    },
    applicationDetails: {
        flex: '1',
        minWidth: '220px'
    },
    statusControl: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '160px'
    },
    statusSelect: {
        padding: '11px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        background: 'white',
        cursor: 'pointer'
    },
    accepted: {
        color: '#198754',
        fontWeight: 'bold'
    },
    rejected: {
        color: '#dc3545',
        fontWeight: 'bold'
    },
    pending: {
        color: '#d18b00',
        fontWeight: 'bold'
    }
};

export default AdminDashboard;
