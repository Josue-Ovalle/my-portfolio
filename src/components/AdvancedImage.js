'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AdvancedImage({ src, alt, width, height, className, blurDataURL }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-700 ${
          isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-100/30 to-purple-100/30 animate-pulse" />
      )}
    </div>
  );
}