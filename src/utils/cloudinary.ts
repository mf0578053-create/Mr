/**
 * Cloudinary Helper Utilities
 * Cloud Name: ngwyxu9p
 */

/**
 * Transforms a standard Cloudinary URL to include automatic quality (q_auto) 
 * and automatic format (f_auto) for optimal web performance.
 */
export function getOptimizedCloudinaryUrl(url: string, width?: number): string {
  if (!url) return url;
  if (!url.includes('res.cloudinary.com')) return url;

  // Check if f_auto,q_auto is already included
  if (url.includes('f_auto') || url.includes('q_auto')) {
    if (width && !url.includes('w_')) {
      return url.replace('/upload/', `/upload/w_${width}/`);
    }
    return url;
  }

  const transformParams = width 
    ? `f_auto,q_auto,w_${width}` 
    : 'f_auto,q_auto';

  return url.replace('/upload/', `/upload/${transformParams}/`);
}

/**
 * Uploads an image (File or Base64 string) to Cloudinary via backend API
 */
export async function uploadToCloudinary(
  fileOrBase64: File | string,
  folder = 'portfolio_uploads'
): Promise<{ url: string; optimized_url: string; public_id: string }> {
  let base64Image = '';

  if (typeof fileOrBase64 === 'string') {
    base64Image = fileOrBase64;
  } else {
    // Convert File object to Base64
    base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(fileOrBase64);
    });
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64Image,
      folder,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to upload image to Cloudinary');
  }

  return {
    url: data.url,
    optimized_url: data.optimized_url || getOptimizedCloudinaryUrl(data.url),
    public_id: data.public_id,
  };
}
