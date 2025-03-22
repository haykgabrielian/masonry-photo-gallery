import { useEffect, useState } from "react";
import { fetchPhotos } from "@/api/pexels";
import { PexelsApiResponse } from "@/types/pexels";

export const usePhotos = (query: string | null, pageCount: number) => {
    const [data, setData] = useState<PexelsApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchAllPhotos = async () => {
            setIsLoading(true);
            try {
                const requests = Array.from({ length: pageCount }, (_, index) =>
                    fetchPhotos(query, index + 1)
                );
                const responses = await Promise.all(requests);
                const combinedPhotos = responses.flatMap((response) => response.photos);
                setData({ photos: combinedPhotos, page: 1, per_page: 80, total_results: combinedPhotos.length });
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Unknown error"));
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllPhotos();
    }, [query, pageCount]);

    return { data, isLoading, error };
};
