import React from 'react';
import { PexelsPhoto } from '@/types/pexels';

export const calculatePositions = (
    visiblePhotos: PexelsPhoto[],
    galleryRef: React.RefObject<HTMLDivElement | null>,
    columnWidth: number,
    gap: number
) => {
    if (!galleryRef.current || visiblePhotos.length === 0) return { positions: [], galleryHeight: 0 };

    const containerWidth = galleryRef.current.clientWidth;
    const columnCount = Math.floor(containerWidth / columnWidth);
    const columnHeights = Array(columnCount).fill(0);
    const newPositions: { top: number; left: number; height: number }[] = [];

    visiblePhotos.forEach((photo) => {
        const aspectRatio = photo.width / photo.height;
        const imageHeight = (columnWidth - gap) / aspectRatio;
        console.log('imageHeight-----', imageHeight);
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        const top = columnHeights[shortestColumn];
        const left = shortestColumn * columnWidth + (containerWidth - columnCount * columnWidth) / 2 + gap / 2;

        columnHeights[shortestColumn] += imageHeight + gap;
        newPositions.push({ top, left, height: imageHeight });
    });

    const galleryHeight = Math.max(...columnHeights);
    return { positions: newPositions, galleryHeight };
};
