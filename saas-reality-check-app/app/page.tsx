'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { validateApiKey } from '@/lib/anthropic';

export default function Home() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    setHasKey(storage.hasApiKey());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsValidating(true);

    try {
      const isValid = await validateApiKey(apiKey);
      if (isValid) {
        storage.saveApiKey(apiKey);
        router.push('/validation');
      } else {
        setError('Invalid API key. Please check and try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate API key');
    } finally {
      setIsValidating(false);
    }
  };

  const handleContinue = () => {
    router.push('/validation');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-danger-600 mb-4">
            SaaS Reality Check
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Validate Your AI Startup Before Writing Code
          </p>
          <p className="text-gray-600 italic">
            Avoid the GPT wrapper graveyard
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-danger-200">
          {hasKey ? (
            // User already has API key
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  API Key Configured
                </h2>
                <p className="text-gray-600">
                  You're ready to validate your startup idea
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-danger-600 hover:bg-danger-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start New Validation
              </button>

              <button
                onClick={() => {
                  storage.clearApiKey();
                  setHasKey(false);
                }}
                className="w-full mt-3 text-sm text-gray-600 hover:text-danger-600"
              >
                Change API Key
              </button>
            </div>
          ) : (
            // API Key Setup
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Setup Your API Key
                </h2>
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-danger-800 mb-2">
                    🔐 BYOK (Bring Your Own Key)
                  </h3>
                  <p className="text-sm text-gray-700">
                    This app uses your personal Claude API key. Your key is stored locally in your browser and never sent to our servers.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Don't have an API key?
                  </h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a></li>
                    <li>Create an account (free tier available)</li>
                    <li>Generate an API key from Settings → API Keys</li>
                    <li>Paste it below</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    💰 Cost Estimate
                  </h4>
                  <p className="text-sm text-gray-700">
                    Each validation costs approximately <strong>$0.01-0.03</strong> using Claude Haiku. You only pay for what you use.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                    Anthropic API Key
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-ant-..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-danger-500 focus:border-danger-500"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isValidating}
                  className="w-full bg-danger-600 hover:bg-danger-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {isValidating ? 'Validating...' : 'Save & Continue'}
                </button>
              </form>
            </>
          )}
        </div>

        {/* System Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            <strong>5-Agent Validation System:</strong> Clara → Ethan → Maya → Isaac → Leo
          </p>
          <p className="text-xs">
            © 2025 Dr. Vivian Nzegbulem | <a href="https://verticalsystems.xyz" target="_blank" rel="noopener noreferrer" className="text-danger-600 hover:underline">Vertical AI Orchestration</a>
          </p>
        </div>
      </div>
    </div>
  );
}
