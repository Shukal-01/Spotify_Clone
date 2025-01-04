import React, { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../utils/formatTime';

interface ProgressBarProps {
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
  expanded?: boolean;
}

export const ProgressBar = ({ duration, currentTime, onSeek, expanded = false }: ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);

  const handleSeek = (clientX: number) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const time = Math.max(0, Math.min(position * duration, duration));
    
    setDragPosition(time);
    if (!isDragging) {
      onSeek(time);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleSeek(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onSeek(dragPosition);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const progress = isDragging 
    ? (dragPosition / duration) * 100 
    : (currentTime / duration) * 100;

  return (
    <div className={`flex items-center gap-2 ${expanded ? 'px-8 py-4' : ''}`}>
      <span className="text-xs text-gray-400 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      
      <div
        ref={progressRef}
        className="relative flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
        onClick={(e) => handleSeek(e.clientX)}
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute h-full bg-white rounded-full group-hover:bg-green-500 transition-colors"
          style={{ width: `${progress}%` }}
        />
        <div
          className={`absolute top-1/2 -mt-2 -ml-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
            isDragging ? 'opacity-100' : ''
          }`}
          style={{ left: `${progress}%` }}
        />
      </div>
      
      <span className="text-xs text-gray-400 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};