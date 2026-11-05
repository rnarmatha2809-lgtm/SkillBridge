require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const Student = require('./models/Student');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);

        rl.question('Enter admin name: ', async (name) => {
            rl.question('Enter admin email: ', async (email) => {
                rl.question('Enter admin password: ', async (password) => {
                    try {
                        const existing = await Student.findOne({
                            email: email.trim().toLowerCase()
                        });

                        if (existing) {
                            console.log('An account with this email already exists.');
                        } else if (password.length < 6) {
                            console.log('Password must contain at least 6 characters.');
                        } else {
                            const hashedPassword = await bcrypt.hash(password, 10);

                            await Student.create({
                                name,
                                email: email.trim().toLowerCase(),
                                password: hashedPassword,
                                department: 'Administration',
                                graduationYear: 2026,
                                role: 'admin'
                            });

                            console.log('Admin account created successfully!');
                        }
                    } catch (error) {
                        console.log('Error:', error.message);
                    } finally {
                        rl.close();
                        await mongoose.disconnect();
                    }
                });
            });
        });

    } catch (error) {
        console.log('Database connection error:', error.message);
        rl.close();
    }
}

createAdmin();