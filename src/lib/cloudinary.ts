export const isCloudinaryConfigured = true;

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  originalFilename: string;
}

interface SignatureResponse {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

async function getUploadSignature(): Promise<SignatureResponse> {
  const response = await fetch('/api/cloudinary-signature', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Could not prepare file upload. Please try again.');
  }
  return response.json();
}

/**
 * Uploads a single file to Cloudinary using a signed request. The
 * signature is generated server-side (see api/cloudinary-signature.ts)
 * so the Cloudinary API secret never reaches the browser.
 */
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const { signature, timestamp, apiKey, cloudName, folder } = await getUploadSignature();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', folder);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.error?.message || `Upload failed for "${file.name}"`);
  }

  const data = await response.json();
  return {
    url: data.secure_url as string,
    publicId: data.public_id as string,
    originalFilename: file.name
  };
}

export async function uploadAllToCloudinary(files: File[]): Promise<CloudinaryUploadResult[]> {
  return Promise.all(files.map(uploadToCloudinary));
}
