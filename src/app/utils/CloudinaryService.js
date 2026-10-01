import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.CLOUDINARY_SECURE !== 'false'
});

const uploadFile = async (file, folder = 'quem-indica') => {
  if (!file || !file.buffer) {
    throw new Error('Nenhum arquivo enviado');
  }

  const base64File = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

  return cloudinary.uploader.upload(base64File, {
    folder,
    resource_type: 'auto',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }]
  });
};

const extractPublicIdFromUrl = (url) => {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split('/').filter(Boolean);
    const uploadIndex = parts.indexOf('upload');

    if (uploadIndex === -1) {
      return null;
    }

    let publicPath = parts.slice(uploadIndex + 1);
    if (publicPath[0]?.startsWith('v')) {
      publicPath = publicPath.slice(1);
    }

    const publicIdWithExtension = publicPath.join('/');
    if (!publicIdWithExtension) {
      return null;
    }

    return publicIdWithExtension.replace(/\.[^/.]+$/, '');
  } catch (error) {
    return null;
  }
};

const deleteByUrl = async (url) => {
  if (!url) {
    return { result: 'not_found' };
  }

  const publicId = extractPublicIdFromUrl(url);
  if (!publicId) {
    return { result: 'not_found' };
  }

  return cloudinary.uploader.destroy(publicId);
};

export const CloudinaryService = {
  uploadFile,
  deleteByUrl,
  extractPublicIdFromUrl
};

export default CloudinaryService;
