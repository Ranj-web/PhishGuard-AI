import React from 'react';

const Education: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Phishing Awareness Education</h1>

        {/* Introduction */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Phishing?</h2>
          <p className="text-gray-700 mb-4">
            Phishing is a cyber attack that uses disguised email as a weapon. The goal is to trick the email recipient
            into believing that the message is something they want or need and from someone they trust. By doing so,
            attackers can steal sensitive information like login credentials, credit card numbers, or install malware.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Did you know?</strong> According to Verizon's 2023 Data Breach Investigations Report,
                  82% of breaches involved a human element, with phishing being the most common attack vector.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Phishing Techniques */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Phishing Techniques</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Phishing */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">📧 Email Phishing</h3>
              <p className="text-gray-600 mb-3">
                The most common type of phishing attack. Attackers send fraudulent emails that appear to come from
                legitimate sources.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fake bank account alerts</li>
                <li>• Urgent password reset requests</li>
                <li>• Malware-infected attachments</li>
                <li>• Prize or lottery notifications</li>
              </ul>
            </div>

            {/* Spear Phishing */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">🎯 Spear Phishing</h3>
              <p className="text-gray-600 mb-3">
                Targeted attacks that use personal information to make the message seem more legitimate and convincing.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Personalized sender names</li>
                <li>• References to recent activities</li>
                <li>• Company-specific language</li>
                <li>• Social engineering tactics</li>
              </ul>
            </div>

            {/* Vishing */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">📞 Vishing (Voice Phishing)</h3>
              <p className="text-gray-600 mb-3">
                Phone-based phishing where attackers call victims pretending to be from legitimate organizations.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tech support scams</li>
                <li>• Bank verification calls</li>
                <li>• IRS or government impersonation</li>
                <li>• Emergency situation claims</li>
              </ul>
            </div>

            {/* Smishing */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">📱 Smishing (SMS Phishing)</h3>
              <p className="text-gray-600 mb-3">
                Phishing attacks conducted via SMS/text messages, often containing malicious links or requests for information.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Package delivery notifications</li>
                <li>• Account verification texts</li>
                <li>• Banking alerts</li>
                <li>• Prize claim messages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Red Flags */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">🚩 Red Flags to Watch For</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-3">Suspicious Email Characteristics</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Unexpected attachments or links
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Urgent requests for action
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Generic greetings like "Dear User"
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Slight variations in domain names
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Poor grammar or spelling errors
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-red-600 mb-3">Behavioral Warning Signs</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Offers that seem too good to be true
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Pressure to act immediately
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Requests for sensitive information
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Threats of account suspension
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Unsolicited contact from "authorities"
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">🛡️ Prevention Best Practices</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-green-600 mb-3">Technical Protections</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use antivirus software with real-time scanning
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Enable multi-factor authentication (MFA)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Keep software and systems updated
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use a password manager
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Install browser security extensions
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-green-600 mb-3">Behavioral Habits</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Verify sender identity independently
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Hover over links before clicking
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Never share sensitive information via email
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Report suspicious emails to IT/security
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use the official website instead of links
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-world Examples */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">📚 Real-World Examples</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="text-lg font-medium text-gray-900">Bank Account Scam</h3>
              <p className="text-gray-600 mt-1">
                Victim receives an email claiming their bank account has suspicious activity and needs immediate verification.
                The email contains a link to a fake login page that captures credentials.
              </p>
              <p className="text-sm text-red-600 mt-2 font-medium">Result: Account drained of $5,000</p>
            </div>

            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="text-lg font-medium text-gray-900">Tech Support Scam</h3>
              <p className="text-gray-600 mt-1">
                Attacker calls claiming to be from Microsoft tech support, stating the victim's computer has viruses.
                They convince the victim to give remote access to "fix" the problem.
              </p>
              <p className="text-sm text-red-600 mt-2 font-medium">Result: Personal data stolen, ransom demanded</p>
            </div>

            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="text-lg font-medium text-gray-900">Business Email Compromise</h3>
              <p className="text-gray-600 mt-1">
                CEO receives an email from what appears to be their assistant requesting an urgent wire transfer.
                The email is slightly altered to use a similar but fake domain.
              </p>
              <p className="text-sm text-red-600 mt-2 font-medium">Result: Company loses $100,000</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Vigilant, Stay Safe</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Phishing attacks are constantly evolving, but knowledge and awareness are your best defenses.
            Use tools like PhishGuard AI to help identify threats and stay one step ahead of attackers.
          </p>
          <button
            onClick={() => window.location.href = '/simulation'}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Test Your Knowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Education;
