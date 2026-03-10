import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ActivityResult {
  url: string;
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  confidence: number;
}

const ActivityMonitor: React.FC = () => {
  const [urls, setUrls] = useState<string>('');
  const [results, setResults] = useState<ActivityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulated browser activity (in a real app, this would come from browser extension)
  const sampleUrls = [
    'https://www.google.com',
    'https://github.com',
    'https://stackoverflow.com',
    'https://paypal-secure-login.com',
    'https://bankofamerica-support.net',
    'https://amazon-account-verify.org'
  ];

  useEffect(() => {
    // Simulate loading recent browser activity
    setUrls(sampleUrls.join('\n'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMonitor = async () => {
    setError('');
    setResults([]);
    setLoading(true);

    const urlList = urls.split('\n').filter(url => url.trim());

    if (urlList.length === 0) {
      setError('Please enter at least one URL');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/scan/activity`, { urls: urlList }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(response.data.results);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Monitoring failed');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'suspicious': return 'text-yellow-600 bg-yellow-100';
      case 'dangerous': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return '✅';
      case 'suspicious': return '⚠️';
      case 'dangerous': return '🚨';
      default: return '❓';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browser Activity Monitor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monitor URLs</h2>
            <p className="text-gray-600 mb-4">
              Enter URLs to monitor for phishing threats. In a real implementation, this would be connected to your browser extension.
            </p>

            <div className="mb-4">
              <label htmlFor="urls" className="block text-sm font-medium text-gray-700 mb-2">
                URLs (one per line)
              </label>
              <textarea
                id="urls"
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com&#10;https://another-site.com"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
              />
            </div>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              onClick={handleMonitor}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Monitoring...' : 'Monitor URLs'}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monitoring Results</h2>

            {results.length === 0 && !loading && (
              <p className="text-gray-500 text-center py-8">
                No URLs monitored yet. Enter URLs and click "Monitor URLs" to get started.
              </p>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="text-xl">🔍</div>
                <p className="text-gray-600 mt-2">Analyzing URLs...</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getRiskIcon(result.riskLevel)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(result.riskLevel)}`}>
                          {result.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{result.confidence}% confidence</span>
                    </div>
                    <div className="text-sm text-gray-700 break-all">
                      {result.url}
                    </div>
                    {result.riskLevel !== 'safe' && (
                      <div className="mt-2 text-xs text-red-600">
                        ⚠️ Potential security risk detected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How Browser Monitoring Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <strong>Real-time Analysis:</strong> URLs are scanned instantly as you browse
            </div>
            <div>
              <strong>Threat Detection:</strong> AI identifies suspicious patterns and malicious sites
            </div>
            <div>
              <strong>Instant Alerts:</strong> Get notified of potential dangers before clicking
            </div>
          </div>
        </div>

        {/* Sample Data Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">ℹ️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This demo uses sample URLs. In a production environment, URLs would be captured
                from your actual browsing activity through a browser extension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityMonitor;
