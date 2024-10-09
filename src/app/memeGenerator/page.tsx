'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface CreateMemeProps {
  searchParams: { id: string; url: string; box_count: number };
}

const CreateMeme: React.FC<CreateMemeProps> = ({ searchParams }) => {
  const [meme, setMeme] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textRefs = useRef<HTMLInputElement[]>([]);

  // Function to create meme
  const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);  // Reset error state before making the request

    // Ensure searchParams are valid
    if (!searchParams.id || !searchParams.url || searchParams.box_count <= 0) {
      setError('Invalid meme template parameters.');
      return;
    }

    try {
      // Create form data
      const formData: Record<string, string> = {
        template_id: searchParams.id,
        username: 'ZubairahmedKaimkhani',
        password: 'alqaim00',
      };

      // Collect text input values safely
      textRefs.current.forEach((ref, index) => {
        if (ref && ref.value) {
          formData[`text${index}`] = ref.value;
        }
      });

      // Fetch request to API
      const response = await fetch('https://api.imgflip.com/caption_image', {
        method: 'POST',
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create meme. Please try again.');
      }

      const data = await response.json();
      if (data.success && data.data && data.data.url) {
        setMeme(data.data.url);
      } else {
        throw new Error('Meme creation failed. Invalid response data.');
      }
    } catch (err) {
      console.error('Error creating meme:', err);
      setError('An error occurred while creating the meme. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Create Meme</h1>

      {/* Render the original meme image */}
      {searchParams.url ? (
        <Image src={searchParams.url} width={300} height={300} alt="meme" className="mb-4" />
      ) : (
        <p className="text-red-500">Invalid meme template URL.</p>
      )}

      {/* Form for creating a meme */}
      <form onSubmit={createMeme} className="flex flex-col items-center">
        {/* Dynamically render input fields based on box_count */}
        {Array.from({ length: searchParams.box_count }, (_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Enter text ${index + 1}`}
            ref={(el) => {
              if (el) textRefs.current[index] = el;
            }}
            className="border p-2 mb-3 rounded w-64 bg-gray-700"
          />
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          Create Meme
        </button>
      </form>

      {/* Display generated meme */}
      {meme && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Generated Meme</h2>
          <Image src={meme} width={300} height={300} alt="Generated meme" />
        </div>
      )}

      {/* Display error messages */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreateMeme;
