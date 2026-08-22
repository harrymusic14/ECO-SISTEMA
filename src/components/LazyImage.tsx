import { useState, type ImgHTMLAttributes } from 'react';
import './LazyImage.css';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
}

const LazyImage = ({ src, alt, className = '', containerClassName = '', ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`lazy-image-container ${containerClassName}`}>
      {!isLoaded && <div className="lazy-image-skeleton"></div>}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`lazy-image-content ${isLoaded ? 'loaded' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
