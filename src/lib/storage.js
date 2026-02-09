export const getPublicImageUrl = (path) => {
    const SUPABASEURL = import.meta.env.VITE_PUBLIC_IMAGE_BASE_URL;
    const BUCKET = "rental-apartments-images";
    return `${SUPABASEURL}/storage/v1/object/public/${BUCKET}/${path}`;
};