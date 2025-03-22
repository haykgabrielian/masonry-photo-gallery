import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
`;

const SearchInput = styled.input`
    padding: 10px 45px 10px 15px;
    width: 400px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
`;

const Clear = styled.div`
    position: absolute;
    right: 15px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    
    &::before,
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2px;
        height: 30px;
        background-color: #000000;
        transform-origin: center;
    }

    &::before {
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;

interface SearchProps {
    query: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const Search: React.FC<SearchProps> = ({ query, onChange, onClear }) => (
    <InputContainer>
        <SearchInput
            type="text"
            placeholder="Search images..."
            value={query}
            onChange={onChange}
        />
        {!!query && <Clear onClick={onClear} />}
    </InputContainer>
);

export default Search;
