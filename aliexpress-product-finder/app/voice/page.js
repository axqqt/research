"use client";
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [textPrompt, setTextPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Fetch available voices from ElevenLabs API
    const fetchVoices = async () => {
      try {
        const response = await fetch('/api/voices'); // You'll need to create this endpoint
        if (!response.ok) throw new Error('Failed to fetch voices');
        const data = await response.json();
        setVoices(data);
        if (data.length > 0) setSelectedVoice(data[0].voice_id);
      } catch (err) {
        console.error('Error fetching voices:', err);
        setError('Failed to load voices');
      }
    };

    fetchVoices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textPrompt, voiceId: selectedVoice }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert text to speech');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text-to-Speech Converter</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows="4"
          placeholder="Enter text to convert to speech"
          required
        />
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        >
          {voices.map((voice) => (
            <option key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Converting...' : 'Convert to Speech'}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {audioUrl && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Generated Audio:</h2>
          <audio controls src={audioUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Page;