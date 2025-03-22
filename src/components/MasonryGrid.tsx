import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import styled from "styled-components";
import { calculatePositions } from "@/helpers/calculatePositions";
import { usePhotos } from "@/hooks/usePhotos";
import { useNavigate } from "@tanstack/react-router";
import { PexelsPhoto } from "@/types/pexels";
import Search from "./Search";
import MasonryItem from "./MasonryItem";

const Masonry = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const MasonryContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1400px;
    margin-top: 30px;
    padding: 0 10px;
`;

const Loading = styled.div`
    position: absolute;
    top: 25px;
    left: 50%;
    z-index: 10;
    color: #fff;
    transform: translate(-50%, -50%);
    font-size: 24px;
`;

const COLUMN_WIDTH = 320;
const GAP = 20;
const ITEMS_PER_LOAD = 20;

const MasonryGrid = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [visiblePhotos, setVisiblePhotos] = useState<PexelsPhoto[]>([]);
    const [loadedCount, setLoadedCount] = useState(ITEMS_PER_LOAD);

    const { data, isLoading, error } = usePhotos(debouncedQuery, 3);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<{ top: number; left: number; height: number }[]>([]);
    const [galleryHeight, setGalleryHeight] = useState(0);

    useEffect(() => {
        if (query !== debouncedQuery) {
            const handler = setTimeout(() => {
                setDebouncedQuery(query);
            }, 500);
            return () => clearTimeout(handler);
        }
    }, [query, debouncedQuery]);

    useEffect(() => {
        if (data && data.photos) {
            setVisiblePhotos(data.photos.slice(0, loadedCount));
        }
    }, [data, loadedCount]);

    const positionsAndHeight = useMemo(() => {
        return calculatePositions(
            visiblePhotos,
            galleryRef,
            COLUMN_WIDTH,
            GAP
        );
    }, [visiblePhotos, galleryRef]);

    useEffect(() => {
        setPositions(positionsAndHeight.positions);
        setGalleryHeight(positionsAndHeight.galleryHeight);
    }, [positionsAndHeight]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setLoadedCount(ITEMS_PER_LOAD);
    }, []);

    const handleClear = useCallback(() => {
        setQuery("");
        setLoadedCount(ITEMS_PER_LOAD);
    }, []);

    const handlePhotoSelect = useCallback((photoId: number) => {
        navigate({ to: `/${photoId}` });
    }, [navigate]);

    const handleScroll = useCallback(() => {
        if (
            galleryRef.current &&
            window.innerHeight + window.scrollY >= galleryRef.current.offsetHeight + galleryRef.current.offsetTop - 300 &&
            data &&
            loadedCount < data.photos.length
        ) {
            setLoadedCount((prev) => Math.min(prev + ITEMS_PER_LOAD, data.photos.length));
        }
    }, [data, loadedCount]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    console.log('visiblePhotos.length-----', visiblePhotos.length);
    return (
        <Masonry>
            <Search query={query} onChange={handleChange} onClear={handleClear} />

            {isLoading && <Loading>Loading...</Loading>}
            {error && <p>Error: {error.message}</p>}

            <MasonryContainer ref={galleryRef} style={{ height: galleryHeight }}>
                {visiblePhotos.map((photo, index) => (
                    <MasonryItem
                        key={photo.id}
                        photo={photo}
                        top={positions[index]?.top || 0}
                        left={positions[index]?.left || 0}
                        height={positions[index]?.height || 0}
                        onSelect={handlePhotoSelect}
                    />
                ))}
            </MasonryContainer>
        </Masonry>
    );
};

export default MasonryGrid;