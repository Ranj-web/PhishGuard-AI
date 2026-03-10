import React, { useState } from 'react';

interface Question {
  id: number;
  email: {
    subject: string;
    sender: string;
    content: string;
  };
  correctAnswer: 'safe' | 'unsafe';
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    email: {
      subject: "Your PayPal Account Has Been Limited",
      sender: "security@paypal.com",
      content: "Dear valued customer,\n\nWe have detected unusual activity on your PayPal account. To restore full access, please verify your identity by clicking the link below and updating your information.\n\nVerify Account: https://paypal-secure-login.com/verify\n\nIf you do not verify within 24 hours, your account will be permanently suspended.\n\nBest regards,\nPayPal Security Team"
    },
    correctAnswer: 'unsafe',
    explanation: "This is a phishing email. The sender address looks legitimate, but the link goes to a suspicious domain. PayPal never asks for verification through email links."
  },
  {
    id: 2,
    email: {
      subject: "Your Amazon Order Confirmation",
      sender: "orders@amazon.com",
      content: "Hello,\n\nThank you for your recent purchase. Your order #123-4567890-1234567 has been shipped and is on its way.\n\nTrack your package: https://amazon.com/track?order=123-4567890-1234567\n\nIf you have any questions, please visit our help center.\n\nRegards,\nAmazon Customer Service"
    },
    correctAnswer: 'safe',
    explanation: "This appears to be a legitimate order confirmation email from Amazon. The link goes to the official amazon.com domain."
  },
  {
    id: 3,
    email: {
      subject: "Urgent: Bank Account Verification Required",
      sender: "support@bankofamerica-alert.com",
      content: "Dear Customer,\n\nDue to recent security updates, we need you to verify your account information immediately. Failure to do so may result in account suspension.\n\nClick here to verify: http://bankofamerica-support.com/verify\n\nThank you for your cooperation.\n\nBank of America Security"
    },
    correctAnswer: 'unsafe',
    explanation: "This is a phishing attempt. The sender domain is not the official bankofamerica.com, and banks never ask for verification through unsolicited emails."
  },
  {
    id: 4,
    email: {
      subject: "Welcome to Netflix - Account Activated",
      sender: "welcome@netflix.com",
      content: "Hi there,\n\nWelcome to Netflix! Your account has been successfully activated. You can now enjoy unlimited streaming of movies and TV shows.\n\nStart watching: https://netflix.com/browse\n\nIf you didn't create this account, please contact our support team.\n\nHappy streaming!\nNetflix Team"
    },
    correctAnswer: 'safe',
    explanation: "This is a legitimate welcome email from Netflix. The domain is correct and the content is appropriate for account activation."
  },
  {
    id: 5,
    email: {
      subject: "Microsoft Windows Security Alert",
      sender: "security@microsoft-support.net",
      content: "Windows Security Alert!\n\nYour computer has been infected with malware. Click the link below to download our security scanner and remove the threat immediately.\n\nDownload Scanner: http://microsoft-security-fix.com/download\n\nDo not turn off your computer!\n\nMicrosoft Security Team"
    },
    correctAnswer: 'unsafe',
    explanation: "This is a common phishing scam. Microsoft never sends unsolicited security alerts or asks users to download software from email links."
  }
];

const Simulation: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'safe' | 'unsafe' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answer: 'safe' | 'unsafe') => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const resetSimulation = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Simulation Complete!</h1>
            <div className="text-6xl font-bold text-blue-600 mb-4">{percentage}%</div>
            <p className="text-lg text-gray-600 mb-6">
              You correctly identified {score} out of {questions.length} phishing attempts.
            </p>
            <div className="mb-6">
              {percentage >= 80 ? (
                <div className="text-green-600">
                  <div className="text-2xl mb-2">🎉 Excellent!</div>
                  <p>You have good phishing awareness skills.</p>
                </div>
              ) : percentage >= 60 ? (
                <div className="text-yellow-600">
                  <div className="text-2xl mb-2">👍 Good Job!</div>
                  <p>You have decent awareness, but there's room for improvement.</p>
                </div>
              ) : (
                <div className="text-red-600">
                  <div className="text-2xl mb-2">⚠️ Needs Improvement</div>
                  <p>Consider reviewing the education section to improve your phishing detection skills.</p>
                </div>
              )}
            </div>
            <button
              onClick={resetSimulation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Phishing Simulation</h1>
          <p className="text-gray-600">Test your ability to identify phishing emails. Question {currentQuestion + 1} of {questions.length}</p>
          <div className="mt-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Email Display */}
          <div className="border-b border-gray-200 p-6">
            <div className="mb-4">
              <div className="text-sm text-gray-600">From: {question.email.sender}</div>
              <div className="text-lg font-medium text-gray-900">Subject: {question.email.subject}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-gray-800 font-sans text-sm">
                {question.email.content}
              </pre>
            </div>
          </div>

          {/* Answer Section */}
          <div className="p-6">
            {!showResult ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Is this email safe or unsafe?</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswer('safe')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
                  >
                    Safe ✓
                  </button>
                  <button
                    onClick={() => handleAnswer('unsafe')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
                  >
                    Unsafe ✗
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className={`mb-4 p-4 rounded-lg ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-green-100 border border-green-400'
                    : 'bg-red-100 border border-red-400'
                }`}>
                  <div className="flex items-center mb-2">
                    {selectedAnswer === question.correctAnswer ? (
                      <span className="text-green-600 font-medium">✓ Correct!</span>
                    ) : (
                      <span className="text-red-600 font-medium">✗ Incorrect</span>
                    )}
                  </div>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
