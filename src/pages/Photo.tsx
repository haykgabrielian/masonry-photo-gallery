import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from '@tanstack/react-router';
import { usePhoto } from '@/hooks/usePhoto';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
`;

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ImageWrapper = styled.div`
    align-self: center;
    width: 100%;
    max-width: 800px;
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 68px -4px ${({ color }) => color};
    -moz-box-shadow: 0 0 68px -4px ${({ color }) => color};
    box-shadow: 0 0 68px -4px ${({ color }) => color};
`;

const Details = styled.div`
    width: 100%;
    margin-top: 20px;
    text-align: left;
`;

const InfoText = styled.p`
    margin: 8px 0;
    font-size: 16px;
    color: #FAFAFA;

    strong {
        color: #a2a2a2;
    }
`;

const BackButton = styled.button`
    margin-top: 20px;
    background: transparent;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Photo = () => {
    const { photoId } = useParams({ from: '/$photoId' });
    const { photo, isLoading, error } = usePhoto(Number(photoId));
    const navigate = useNavigate();

    const handleBack = () => {
        navigate({ to: '/' });
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!photo) {
        return <p>Photo not found.</p>;
    }

    return (
        <Wrapper>
            <BackButton onClick={handleBack}>Back to Gallery</BackButton>
            <PhotoContainer>
                <Details>
                    <InfoText><strong>Photographer:</strong> {photo.photographer}</InfoText>
                    <InfoText><strong>Description:</strong> {photo.alt || 'No description available.'}</InfoText>
                    <InfoText><strong>URL:</strong> {photo.url || 'No URL available.'}</InfoText>
                </Details>
                <ImageWrapper>
                    <Image color={photo.avg_color} src={photo.src.original} alt={photo.photographer} />
                </ImageWrapper>
            </PhotoContainer>
        </Wrapper>
    );
};

export default Photo;
