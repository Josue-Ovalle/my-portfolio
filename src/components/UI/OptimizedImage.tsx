'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { OptimizedImageProps } from '@/types';

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackSrc = null,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  showSkeleton = true,
  aspectRatio = 'auto',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate a proper base64 blur placeholder
  const generateBlurDataURL = useCallback((w: number, h: number): string => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a subtle gradient blur
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    
    return canvas.toDataURL();
  }, []);

  const blurDataURL = generateBlurDataURL(40, 40);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    
    // Try fallback image if provided
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    }
  }, [fallbackSrc, currentSrc]);

  // Generate initials from alt text as ultimate fallback
  const getInitials = useCallback((text: string): string => {
    return text
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }, []);

  const containerClasses = `relative overflow-hidden ${className}`;
  const aspectRatioClasses = {
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
    'auto': ''
  };

  // Error state with initials fallback
  if (hasError && (!fallbackSrc || currentSrc === fallbackSrc)) {
    return (
      <div className={`${containerClasses} ${aspectRatioClasses[aspectRatio]} bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 flex items-center justify-center`}>
        <div className="text-brand-600 dark:text-brand-400 font-bold text-2xl">
          {getInitials(alt)}
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${aspectRatioClasses[aspectRatio]}`}>
      {/* Loading Skeleton */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      )}

      {/* Actual Image */}
      <Image
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-500 ${
          isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;