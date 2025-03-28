import { useState, useEffect } from "react";
import { fetchPhotoById } from "@/api/pexels";

export const usePhoto = (photoId: number) => {
    const [photo, setPhoto] = useState<null | any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!photoId) return;

            setIsLoading(true);
            try {
                const result = await fetchPhotoById(photoId);
                setPhoto(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Unknown error"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [photoId]);

    return { photo, isLoading, error };
};