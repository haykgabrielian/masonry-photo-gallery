import React from 'react';
import styled from 'styled-components';
import { PexelsPhoto } from '@/types/pexels';

const ImageWrapper = styled.div<{ top: number; left: number; height: number }>`
    position: absolute;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
    height: ${({ height }) => height}px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    transition: transform .3s;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.04);
    }
`;

interface MasonryItemProps {
    photo: PexelsPhoto;
    top: number;
    left: number;
    height: number;
    onSelect: (photoId: number) => void;
}

const MasonryItem: React.FC<MasonryItemProps> = React.memo(({ photo, top, left, height, onSelect }) => {
    return (
        <ImageWrapper top={top} left={left} height={height}>
            <Image onClick={() => onSelect(photo.id)} src={photo.src.medium} alt={photo.photographer} />
        </ImageWrapper>
    );
});

export default MasonryItem;
