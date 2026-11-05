import React, { useEffect, useState } from 'react';

// Render Backend API URL
const API_BASE = 'https://skillbridge-backend-skw3.onrender.com/api';

function ApplicationTracking({ onBack }) {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('skillbridgeToken');

                if (!token) {
                    throw new Error('Please login again to view your applications.');
                }

                const response = await fetch(`${API_BASE}/applications/my`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Unable to load applications'
                    );
                }

                setApplications(Array.isArray(data) ? data : []);

            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const getStatusColor = (status) => {
        switch ((status || 'Pending').toLowerCase()) {
            case 'accepted':
                return '#16a34a';
            case 'rejected':
                return '#dc2626';
            default:
                return '#d97706';
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            padding: '30px',
            background: '#f4f6fb',
            fontFamily: 'Arial, sans-serif'
        }}>

            <button
                onClick={onBack}
                type="button"
                style={{
                    padding: '10px 18px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#263b80',
                    color: 'white',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                ← Back to Dashboard
            </button>

            <h1>My Applications</h1>

            <p>
                Track the status of your job and internship applications.
            </p>

            {loading && <p>Loading your applications...</p>}

            {error && (
                <p style={{ color: '#dc2626' }}>{error}</p>
            )}

            {!loading && !error && applications.length === 0 && (
                <div style={{
                    background: 'white',
                    padding: '25px',
                    borderRadius: '10px',
                    marginTop: '20px'
                }}>
                    <h3>No applications yet</h3>
                    <p>
                        Explore Jobs & Internships and apply for an opportunity.
                    </p>
                </div>
            )}

            {!loading && !error && applications.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '20px',
                    marginTop: '25px'
                }}>

                    {applications.map((application) => {
                        const job = application.job || {};
                        const status = application.status || 'Pending';

                        return (
                            <div
                                key={application._id}
                                style={{
                                    background: 'white',
                                    padding: '22px',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                }}
                            >

                                <h2>
                                    {job.title || 'Job title unavailable'}
                                </h2>

                                <p>
                                    <strong>Company:</strong>{' '}
                                    {job.company || 'Not specified'}
                                </p>

                                <p>
                                    <strong>Applied on:</strong>{' '}
                                    {application.appliedAt
                                        ? new Date(
                                            application.appliedAt
                                        ).toLocaleDateString()
                                        : 'Date unavailable'}
                                </p>

                                <p>
                                    <strong>Status:</strong>{' '}
                                    <span style={{
                                        color: getStatusColor(status),
                                        fontWeight: 'bold'
                                    }}>
                                        {status}
                                    </span>
                                </p>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default ApplicationTracking;
