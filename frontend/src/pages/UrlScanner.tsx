import React, { useState } from 'react';
import axios from 'axios';

const UrlScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/scan/url`, { url }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Scan failed');
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

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">URL Scanner</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleScan} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Enter URL to scan
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="url"
                  name="url"
                  id="url"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Scanning...' : 'Scan URL'}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Scan Results</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-700 mr-2">Risk Level:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(result.riskLevel)}`}>
                    {result.riskLevel.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Confidence:</span>
                  <span className="ml-2 text-sm text-gray-900">{result.confidence}%</span>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">URL:</span>
                  <span className="ml-2 text-sm text-gray-900 break-all">{result.url}</span>
                </div>

                {result.features && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700">Features Analyzed:</span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {Object.entries(result.features).map(([key, value]) => (
                        <div key={key} className="text-xs text-gray-600">
                          <span className="font-medium">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-700">
                  <span className="font-medium">Message:</span> {result.message}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlScanner;
