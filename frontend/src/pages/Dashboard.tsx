import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DashboardData {
  totalScans: number;
  blockedAttempts: number;
  accuracy: number;
  recentScans: Array<{
    _id: string;
    type: string;
    result: string;
    createdAt: string;
  }>;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Scans
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {data?.totalScans || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">B</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Blocked Attempts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {data?.blockedAttempts || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Accuracy Score
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {data?.accuracy || 0}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Scans
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {data?.recentScans?.map((scan) => (
              <li key={scan._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          scan.result === 'safe' ? 'bg-green-100' :
                          scan.result === 'suspicious' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <span className={`text-sm font-medium ${
                            scan.result === 'safe' ? 'text-green-800' :
                            scan.result === 'suspicious' ? 'text-yellow-800' : 'text-red-800'
                          }`}>
                            {scan.type === 'url' ? 'U' : 'E'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {scan.result}
                        </div>
                        <div className="text-sm text-gray-500">
                          {scan.type} scan
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(scan.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </li>
            )) || (
              <li>
                <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  No scans yet
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
