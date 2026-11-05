const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Assessment = require('../models/Assessment');

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Authentication required. Please login.'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();

    } catch (error) {
        console.error('Authentication error:', error);

        return res.status(401).json({
            message: 'Invalid or expired token.'
        });
    }
};

// ==========================================
// ADMIN MIDDLEWARE
// ==========================================

const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Admin access required.'
        });
    }

    next();
};

// ==========================================
// REGISTER
// ==========================================

router.post('/register', async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            department,
            graduationYear
        } = req.body;

        if (!name || !email || !password ||
            !department || !graduationYear) {
            return res.status(400).json({
                message: 'Please fill all required fields.'
            });
        }

        const existingStudent = await Student.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingStudent) {
            return res.status(409).json({
                message: 'Email already registered.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            department,
            graduationYear: Number(graduationYear),
            skills: [],
            careerGoal: '',
            role: 'student'
        });

        res.status(201).json({
            message: 'Registration successful.',
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);

        res.status(500).json({
            message: 'Registration failed.'
        });
    }
});

// ==========================================
// LOGIN
// ==========================================

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter email and password.'
            });
        }

        const student = await Student.findOne({
            email: email.toLowerCase().trim()
        });

        if (!student) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            student.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const token = jwt.sign(
            {
                id: student._id,
                role: student.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful.',
            token,
            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
                department: student.department,
                graduationYear: student.graduationYear,
                skills: student.skills,
                careerGoal: student.careerGoal,
                role: student.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);

        res.status(500).json({
            message: 'Login failed.'
        });
    }
});

// ==========================================
// GET STUDENT PROFILE
// ==========================================

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id)
            .select('-password');

        if (!student) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        res.json({ student });

    } catch (error) {
        console.error('Profile error:', error);

        res.status(500).json({
            message: 'Unable to fetch profile.'
        });
    }
});

// ==========================================
// UPDATE STUDENT PROFILE
// ==========================================

router.put('/profile', verifyToken, async (req, res) => {
    try {
        const {
            name,
            department,
            graduationYear,
            careerGoal
        } = req.body;

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (department !== undefined) updateData.department = department;
        if (graduationYear !== undefined) {
            updateData.graduationYear = Number(graduationYear);
        }
        if (careerGoal !== undefined) updateData.careerGoal = careerGoal;

        const student = await Student.findByIdAndUpdate(
            req.user.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!student) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        res.json({
            message: 'Profile updated successfully.',
            student
        });

    } catch (error) {
        console.error('Profile update error:', error);

        res.status(500).json({
            message: 'Profile update failed.'
        });
    }
});

// ==========================================
// ADD NEW SKILL
// ==========================================

router.post('/skills', verifyToken, async (req, res) => {
    try {
        const skill = String(req.body.skill || '').trim();

        if (!skill) {
            return res.status(400).json({
                message: 'Please enter a skill.'
            });
        }

        const student = await Student.findById(req.user.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        const alreadyExists = student.skills.some(
            item => item.toLowerCase() === skill.toLowerCase()
        );

        if (alreadyExists) {
            return res.status(409).json({
                message: 'This skill already exists.'
            });
        }

        student.skills.push(skill);
        await student.save();

        res.json({
            message: 'Skill added successfully.',
            skills: student.skills
        });

    } catch (error) {
        console.error('Add skill error:', error);

        res.status(500).json({
            message: 'Unable to add skill.'
        });
    }
});

// ==========================================
// REMOVE SKILL
// ==========================================

router.delete('/skills/:skill', verifyToken, async (req, res) => {
    try {
        const skill = decodeURIComponent(req.params.skill);

        const student = await Student.findById(req.user.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        student.skills = student.skills.filter(
            item => item.toLowerCase() !== skill.toLowerCase()
        );

        await student.save();

        res.json({
            message: 'Skill removed successfully.',
            skills: student.skills
        });

    } catch (error) {
        console.error('Remove skill error:', error);

        res.status(500).json({
            message: 'Unable to remove skill.'
        });
    }
});

// ==========================================
// SKILL GAP ANALYSIS
// ==========================================

const roleSkills = {
    'Frontend Developer': [
        'HTML', 'CSS', 'JavaScript', 'React', 'Git'
    ],

    'Backend Developer': [
        'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Git'
    ],

    'Full Stack Developer': [
        'HTML', 'CSS', 'JavaScript', 'React',
        'Node.js', 'Express', 'MongoDB', 'Git'
    ],

    'Python Developer': [
        'Python', 'SQL', 'Django', 'Git',
        'Problem Solving'
    ],

    'Software Developer': [
        'Java', 'Python', 'Data Structures',
        'Object-Oriented Programming', 'SQL',
        'Git', 'Problem Solving'
    ],

    'Java Developer': [
        'Java', 'OOP', 'Collections Framework',
        'Exception Handling', 'JDBC', 'SQL', 'Git'
    ],

    'Data Analyst': [
        'Excel', 'SQL', 'Python', 'Power BI',
        'Statistics', 'Data Visualization'
    ],

    'Data Scientist': [
        'Python', 'Statistics', 'Machine Learning',
        'Pandas', 'NumPy', 'SQL', 'Data Visualization'
    ],

    'UI/UX Designer': [
        'Figma', 'Wireframing', 'Prototyping',
        'User Research', 'Visual Design',
        'Typography', 'Responsive Design'
    ],

    'DevOps Engineer': [
        'Linux', 'Git', 'Docker', 'Jenkins',
        'CI/CD', 'AWS', 'Kubernetes', 'Scripting'
    ]
};

router.get('/skill-gap', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        const role = req.query.role ||
            student.careerGoal ||
            'Frontend Developer';

        const requiredSkills = roleSkills[role];

        if (!requiredSkills) {
            return res.status(400).json({
                message: 'Invalid career role.'
            });
        }

        const currentSkills = student.skills || [];

        const matchedSkills = requiredSkills.filter(skill =>
            currentSkills.some(
                item => item.toLowerCase() === skill.toLowerCase()
            )
        );

        const missingSkills = requiredSkills.filter(
            skill => !matchedSkills.includes(skill)
        );

        const percentage = Math.round(
            (matchedSkills.length / requiredSkills.length) * 100
        );

        res.json({
            role,
            currentSkills,
            requiredSkills,
            matchedSkills,
            missingSkills,
            percentage
        });

    } catch (error) {
        console.error('Skill gap error:', error);

        res.status(500).json({
            message: 'Skill gap analysis failed.'
        });
    }
});

// ==========================================
// SAVE ASSESSMENT
// ==========================================

router.post('/assessments', verifyToken, async (req, res) => {
    try {
        const {
            role,
            score,
            totalQuestions,
            skillResults
        } = req.body;

        if (
            !role ||
            totalQuestions === undefined ||
            !Array.isArray(skillResults) ||
            Number(totalQuestions) <= 0 ||
            Number(score) < 0 ||
            Number(score) > Number(totalQuestions)
        ) {
            return res.status(400).json({
                message: 'Invalid assessment data.'
            });
        }

        const percentage = Math.round(
            (Number(score) / Number(totalQuestions)) * 100
        );

        const assessment = await Assessment.create({
            student: req.user.id,
            role,
            score: Number(score),
            totalQuestions: Number(totalQuestions),
            percentage,
            skillResults
        });

        res.status(201).json({
            message: 'Assessment saved successfully.',
            assessment
        });

    } catch (error) {
        console.error('Assessment error:', error);

        res.status(500).json({
            message: 'Unable to save assessment.'
        });
    }
});

// ==========================================
// GET JOBS AND INTERNSHIPS
// ==========================================

router.get('/jobs', verifyToken, async (req, res) => {
    try {
        const filter = {};

        if (req.query.type) {
            filter.type = req.query.type;
        }

        if (req.query.search) {
            filter.$or = [
                {
                    title: {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                },
                {
                    company: {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                },
                {
                    location: {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                }
            ];
        }

        filter.lastDate = { $gte: new Date() };

        const jobs = await Job.find(filter)
            .sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {
        console.error('Fetch jobs error:', error);

        res.status(500).json({
            message: 'Unable to fetch opportunities.'
        });
    }
});

// ==========================================
// ADD JOB OR INTERNSHIP - ADMIN ONLY
// ==========================================

router.post('/jobs', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            type,
            location,
            skillsRequired,
            salary,
            lastDate
        } = req.body;

        if (
            !title ||
            !company ||
            !description ||
            !type ||
            !location ||
            !lastDate
        ) {
            return res.status(400).json({
                message: 'Please fill all required fields.'
            });
        }

        if (!['Job', 'Internship'].includes(type)) {
            return res.status(400).json({
                message: 'Type must be Job or Internship.'
            });
        }

        const job = await Job.create({
            title,
            company,
            description,
            type,
            location,
            skillsRequired: Array.isArray(skillsRequired)
                ? skillsRequired
                : [],
            salary: salary || 'Not specified',
            lastDate
        });

        res.status(201).json({
            message: 'Opportunity added successfully.',
            job
        });

    } catch (error) {
        console.error('Add opportunity error:', error);

        res.status(500).json({
            message: 'Unable to add opportunity.'
        });
    }
});

// ==========================================
// DELETE JOB OR INTERNSHIP - ADMIN ONLY
// ==========================================

router.delete('/jobs/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: 'Opportunity not found.'
            });
        }

        await Application.deleteMany({
            job: req.params.id
        });

        res.json({
            message: 'Opportunity deleted successfully.'
        });

    } catch (error) {
        console.error('Delete opportunity error:', error);

        res.status(500).json({
            message: 'Unable to delete opportunity.'
        });
    }
});

// ==========================================
// APPLY FOR JOB OR INTERNSHIP
// ==========================================

router.post('/applications', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({
                message: 'Only students can apply.'
            });
        }

        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: 'Please select an opportunity.'
            });
        }

        const job = await Job.findById(jobId);

        if (!job || new Date(job.lastDate) < new Date()) {
            return res.status(404).json({
                message: 'Opportunity not found or application deadline passed.'
            });
        }

        const existing = await Application.findOne({
            student: req.user.id,
            job: jobId
        });

        if (existing) {
            return res.status(409).json({
                message: 'You have already applied.'
            });
        }

        const application = await Application.create({
            student: req.user.id,
            job: jobId
        });

        res.status(201).json({
            message: 'Application submitted successfully.',
            application
        });

    } catch (error) {
        console.error('Application error:', error);

        res.status(500).json({
            message: 'Unable to submit application.'
        });
    }
});

// ==========================================
// STUDENT APPLICATION TRACKING
// ==========================================

router.get('/applications/my', verifyToken, async (req, res) => {
    try {
        const applications = await Application.find({
            student: req.user.id
        })
            .populate('job')
            .sort({ appliedAt: -1 });

        res.json(applications);

    } catch (error) {
        console.error('My applications error:', error);

        res.status(500).json({
            message: 'Unable to fetch your applications.'
        });
    }
});

// ==========================================
// ADMIN VIEW ALL APPLICATIONS
// ==========================================

router.get('/applications', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('student', 'name email department')
            .populate('job', 'title company type')
            .sort({ appliedAt: -1 });

        res.json(applications);

    } catch (error) {
        console.error('All applications error:', error);

        res.status(500).json({
            message: 'Unable to fetch applications.'
        });
    }
});

// ==========================================
// ADMIN UPDATE APPLICATION STATUS
// ==========================================

router.put(
    '/applications/:id/status',
    verifyToken,
    verifyAdmin,
    async (req, res) => {
        try {
            const { status } = req.body;

            if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
                return res.status(400).json({
                    message: 'Invalid application status.'
                });
            }

            const application = await Application.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

            if (!application) {
                return res.status(404).json({
                    message: 'Application not found.'
                });
            }

            res.json({
                message: 'Application status updated.',
                application
            });

        } catch (error) {
            console.error('Update application error:', error);

            res.status(500).json({
                message: 'Unable to update application.'
            });
        }
    }
);

// ==========================================
// AI COURSE RECOMMENDATIONS
// ==========================================

router.post('/recommendations/generate', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        const role = req.body.role ||
            student.careerGoal ||
            'Frontend Developer';

        const requiredSkills = roleSkills[role] || [];

        const studentSkills = student.skills || [];

        const missingSkills = requiredSkills.filter(skill =>
            !studentSkills.some(
                item => item.toLowerCase() === skill.toLowerCase()
            )
        );

        const recommendations = missingSkills.map((skill, index) => ({
            courseId: skill.toLowerCase().replace(/\s+/g, '-'),
            title: skill + ' - Learning Resources',
            skillTags: [skill],
            link: 'https://www.google.com/search?q=' +
                encodeURIComponent(skill + ' free course'),
            reason: 'Learn ' + skill + ' to improve your ' + role + ' skills.',
            priority: index < 2 ? 'High' : 'Medium'
        }));

        res.json({
            role,
            studentSkills,
            missingSkills,
            recommendations: recommendations.slice(0, 5)
        });

    } catch (error) {
        console.error('Recommendation error:', error);

        res.status(500).json({
            message: 'Unable to generate recommendations.'
        });
    }
});

// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;