'use client';

interface NewsImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function NewsImage({ src, alt, className }: NewsImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
