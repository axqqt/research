"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const [textPrompt, setTextPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const response = await fetch('/api/ai-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textPrompt }),
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
      <br/>
      <Link href={"/"}>Back to homepage</Link>
      <br/><br/>
      <Link href={"/download"} style={{ margin: "40px" }}>
        Tiktok Scraping
      </Link>
      <br/><br/>
      <h1 className="text-2xl font-bold mb-4">Text-to-Speech Converter</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={textPrompt}
          style={{color:"black"}}
          onChange={(e) => setTextPrompt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows="4"
          placeholder="Enter text to convert to speech"
          required
        />
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