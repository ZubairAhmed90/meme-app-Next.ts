'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';  

interface Meme {
  id: string;
  name: string;
  url: string;
  box_count: number;
}

const Page = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch memes data
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        setMemes(data.data.memes);
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchMemes();
  }, []);

  if (loading) {
    return <Loader />;  
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-8 bg-slate-600 p-5">Meme Maker</h1>
      <div className="flex justify-center gap-5 flex-wrap">
        {memes.map((item: Meme) => (
          <div 
            key={item.id} 
            className="border rounded-lg shadow-lg p-4 text-center max-w-xs w-64 h-96 flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <Image
              src={item.url}
              width={200}
              height={200}
              alt={item.name}
              className="rounded object-cover mx-auto mb-4"
              style={{ maxHeight: '150px' }}  // Image height constraint
            />
            <Link
              href={{
                pathname: '/memeGenerator',
                query: {
                  url: item.url,
                  id: item.id,
                  box_count: item.box_count,
                },
              }}
            >
              <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Generate Meme
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
