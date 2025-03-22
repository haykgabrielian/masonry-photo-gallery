import { PexelsApiResponse, PexelsPhoto } from '@/types/pexels';

const API_URL = import.meta.env.VITE_PIXELS_API_URL;
const API_KEY = import.meta.env.VITE_PIXELS_API_KEY;

const headers = {
    Authorization: API_KEY,
};

export const fetchPhotos = async (
    query: string | null = null,
    page = 1,
    perPage = 80
): Promise<PexelsApiResponse> => {
    const url = query
        ? `${API_URL}/search?query=${query}&page=${page}&per_page=${perPage}`
        : `${API_URL}/curated?page=${page}&per_page=${perPage}`;

    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error('Failed to fetch photos');
    }
    return response.json();
};

export const fetchPhotoById = async (photoId: number): Promise<PexelsPhoto> => {
    const response = await fetch(`${API_URL}/photos/${photoId}`, { headers });
    if (!response.ok) {
        throw new Error('Failed to fetch photo');
    }
    return response.json();
};
