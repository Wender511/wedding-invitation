"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  fill = false,
  priority = false,
  sizes = "100vw",
  quality = 90,
  objectFit = "cover",
  objectPosition = "center",
  placeholder = "empty",
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-neutral-100 text-neutral-400",
        className
      )}>
        <span className="text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={cn(
          `object-${objectFit}`,
          objectPosition && `object-[${objectPosition}]`,
          isLoading && "opacity-0",
          !isLoading && "opacity-100 transition-opacity duration-300"
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
