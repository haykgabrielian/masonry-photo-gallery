export interface PexelsPhotoSrc {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export interface PexelsPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    src: PexelsPhotoSrc;
    alt: string;
    avg_color: string;
}

export interface PexelsApiResponse {
    page: number;
    per_page: number;
    total_results: number;
    photos: PexelsPhoto[];
    next_page?: string;
}