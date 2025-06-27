'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GalleryAdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const seedData = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/gallery-frontend/seed', {
        method: 'POST',
      });
      const result = await response.json();
      
      if (result.success) {
        setMessage(`✅ Created ${result.total} gallery items successfully!`);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const clearData = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/gallery-frontend/seed', {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (result.success) {
        setMessage(`✅ Deleted ${result.deletedCount} gallery items successfully!`);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testAPI = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/gallery-frontend');
      const result = await response.json();
      
      if (result.success) {
        setMessage(`✅ API working! Source: ${result.source}, Total: ${result.total || 0} items`);
      } else {
        setMessage(`❌ API Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] text-[#FAF3E0] min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gallery Admin Panel</h1>
        
        <div className="space-y-6">
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Test Gallery Integration</h2>
            
            <div className="space-y-4">
              <button
                onClick={testAPI}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded transition-colors"
              >
                {loading ? 'Testing...' : 'Test Gallery API'}
              </button>
              
              <button
                onClick={seedData}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded transition-colors"
              >
                {loading ? 'Creating...' : 'Create Sample Data'}
              </button>
              
              <button
                onClick={clearData}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded transition-colors"
              >
                {loading ? 'Deleting...' : 'Clear All Data'}
              </button>
            </div>
            
            {message && (
              <div className="mt-4 p-4 bg-[#3A3A3A] rounded-lg">
                <p className="text-sm font-mono">{message}</p>
              </div>
            )}
          </div>
          
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            
            <div className="space-y-2">
              <button
                onClick={() => router.push('/gallery')}
                className="w-full bg-[#FAF3E0] text-[#1A1A1A] hover:bg-[#E5D6C1] font-bold py-2 px-4 rounded transition-colors"
              >
                View Gallery Page
              </button>
              
              <button
                onClick={() => router.push('/admin')}
                className="w-full bg-[#FAF3E0] text-[#1A1A1A] hover:bg-[#E5D6C1] font-bold py-2 px-4 rounded transition-colors"
              >
                PayloadCMS Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
