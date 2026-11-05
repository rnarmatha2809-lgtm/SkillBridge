
import React, { useState } from 'react';
import roleAssessmentData from './data/roleAssessmentData.js';

function SkillAssessment({ selectedRole, onBack }) {
  const questions = roleAssessmentData[selectedRole] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState(false);

  const handleAnswer = (option) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [currentQuestion]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setFinished(false);
    setSaveMessage('');
    setSaveError(false);
  };

  // Calculate total score
  const score = questions.reduce((total, question, index) => {
    return total + (
      selectedAnswers[index] === question.answer ? 1 : 0
    );
  }, 0);

  // Calculate percentage
  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  // Calculate skill-wise performance
  const skillResults = questions.reduce((results, question, index) => {
    if (!results[question.skill]) {
      results[question.skill] = {
        total: 0,
        correct: 0
      };
    }

    results[question.skill].total += 1;

    if (selectedAnswers[index] === question.answer) {
      results[question.skill].correct += 1;
    }

    return results;
  }, {});

  // Save assessment result to MongoDB
  const saveAssessmentResult = async () => {
    try {
      setSaving(true);
      setSaveMessage('');
      setSaveError(false);

      const token = localStorage.getItem('skillbridgeToken');

      if (!token) {
        throw new Error('Please log in again to save your assessment.');
      }

      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          role: selectedRole,
          score: score,
          totalQuestions: questions.length,
          skillResults: Object.entries(skillResults).map(
            ([skill, result]) => ({
              skill: skill,
              correct: result.correct,
              total: result.total
            })
          )
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to save assessment result.'
        );
      }

      setSaveMessage('Assessment result saved successfully!');
    } catch (error) {
      console.error('Assessment save error:', error);

      setSaveMessage(
        error.message || 'Unable to save assessment result.'
      );

      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  // Finish assessment and save result
  const handleFinish = async () => {
    if (saving) return;

    setFinished(true);
    await saveAssessmentResult();
  };

  const current = questions[currentQuestion];

  // Handle missing questions
  if (questions.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2>Assessment Not Available</h2>

          <p>No questions were found for {selectedRole}.</p>

          <button style={styles.backButton} onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>

        <h1 style={styles.heading}>
          Skill Assessment
        </h1>

        <p style={styles.subtitle}>
          Career Role: <strong>{selectedRole}</strong>
        </p>

        {!finished ? (
          <div style={styles.card}>

            <div style={styles.questionHeader}>
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>

              <span style={styles.skillBadge}>
                {current.skill}
              </span>
            </div>

            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width:
                    ((currentQuestion + 1) / questions.length) * 100 + '%'
                }}
              />
            </div>

            <h2 style={styles.question}>
              {current.question}
            </h2>

            <div style={styles.options}>
              {current.options.map((option, index) => {
                const isSelected =
                  selectedAnswers[currentQuestion] === option;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    style={{
                      ...styles.option,
                      ...(isSelected ? styles.selectedOption : {})
                    }}
                  >
                    <span style={styles.optionLetter}>
                      {String.fromCharCode(65 + index)}.
                    </span>

                    {option}
                  </button>
                );
              })}
            </div>

            <div style={styles.navigation}>

              <button
                style={{
                  ...styles.previousButton,
                  opacity: currentQuestion === 0 ? 0.5 : 1
                }}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>

              <button
                style={styles.nextButton}
                onClick={
                  currentQuestion === questions.length - 1
                    ? handleFinish
                    : handleNext
                }
                disabled={
                  !Object.prototype.hasOwnProperty.call(
                    selectedAnswers,
                    currentQuestion
                  ) || saving
                }
              >
                {currentQuestion === questions.length - 1
                  ? 'Finish Assessment'
                  : 'Next Question →'}
              </button>

            </div>

          </div>
        ) : (
          <div style={styles.card}>

            <div style={styles.resultHeader}>
              <h2>Assessment Completed!</h2>
              <p>{selectedRole}</p>
            </div>

            <div style={styles.scoreCircle}>
              <strong>{percentage}%</strong>
              <span>Your Score</span>
            </div>

            <h2 style={styles.scoreText}>
              {score} out of {questions.length} correct answers
            </h2>

            <p style={styles.feedback}>
              {percentage >= 80
                ? 'Excellent! You have a strong understanding of this role.'
                : percentage >= 60
                ? 'Good work! Keep practising to improve your skills.'
                : percentage >= 40
                ? 'You are making progress. Focus on the skills below.'
                : 'Keep learning and practising. You can improve with regular effort.'}
            </p>

            <p
              style={{
                ...styles.saveStatus,
                color: saveError ? '#dc2626' : '#15803d'
              }}
            >
              {saving
                ? 'Saving your assessment result...'
                : saveMessage}
            </p>

            <h3 style={styles.sectionHeading}>
              Skill-wise Performance
            </h3>

            {Object.entries(skillResults).map(([skill, result]) => {
              const skillPercentage = Math.round(
                (result.correct / result.total) * 100
              );

              return (
                <div key={skill} style={styles.skillResult}>

                  <div style={styles.skillResultHeader}>
                    <strong>{skill}</strong>

                    <span>
                      {result.correct}/{result.total} ({skillPercentage}%)
                    </span>
                  </div>

                  <div style={styles.progressTrack}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: skillPercentage + '%',
                        background:
                          skillPercentage >= 60 ? '#16a34a' : '#ef4444'
                      }}
                    />
                  </div>

                </div>
              );
            })}

            <div style={styles.resultButtons}>

              <button
                style={styles.nextButton}
                onClick={handleRestart}
                disabled={saving}
              >
                Retake Assessment
              </button>

              <button
                style={styles.previousButton}
                onClick={onBack}
                disabled={saving}
              >
                Back to Dashboard
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f7fb',
    padding: '35px 20px'
  },

  container: {
    maxWidth: '850px',
    margin: '0 auto'
  },

  card: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.06)'
  },

  backButton: {
    background: '#e2e8f0',
    color: '#1e293b',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '20px'
  },

  heading: {
    color: '#172554',
    fontSize: '32px',
    marginBottom: '8px'
  },

  subtitle: {
    color: '#64748b',
    marginBottom: '25px'
  },

  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    color: '#475569',
    marginBottom: '18px'
  },

  skillBadge: {
    background: '#dbeafe',
    color: '#1d4ed8',
    padding: '7px 13px',
    borderRadius: '20px',
    fontSize: '13px'
  },

  progressTrack: {
    height: '10px',
    background: '#e2e8f0',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '25px'
  },

  progressFill: {
    height: '100%',
    background: '#2563eb',
    borderRadius: '20px',
    transition: 'width 0.3s'
  },

  question: {
    color: '#172554',
    fontSize: '22px',
    lineHeight: 1.5,
    marginBottom: '25px'
  },

  options: {
    display: 'grid',
    gap: '12px'
  },

  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    textAlign: 'left',
    padding: '15px',
    border: '1px solid #cbd5e1',
    borderRadius: '9px',
    background: '#ffffff',
    color: '#334155',
    cursor: 'pointer',
    fontSize: '15px'
  },

  selectedOption: {
    background: '#dbeafe',
    border: '2px solid #2563eb',
    color: '#1d4ed8'
  },

  optionLetter: {
    fontWeight: 'bold'
  },

  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '30px',
    flexWrap: 'wrap'
  },

  previousButton: {
    background: '#e2e8f0',
    color: '#1e293b',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },

  nextButton: {
    background: '#2563eb',
    color: '#ffffff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  resultHeader: {
    textAlign: 'center',
    color: '#172554'
  },

  scoreCircle: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: '#dbeafe',
    color: '#1d4ed8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '25px auto'
  },

  scoreText: {
    textAlign: 'center',
    color: '#172554'
  },

  feedback: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '20px'
  },

  saveStatus: {
    textAlign: 'center',
    fontWeight: 'bold',
    minHeight: '24px',
    marginBottom: '20px'
  },

  sectionHeading: {
    color: '#172554',
    marginBottom: '20px'
  },

  skillResult: {
    marginBottom: '20px'
  },

  skillResultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '8px',
    color: '#334155'
  },

  resultButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '30px'
  }
};

export default SkillAssessment;
