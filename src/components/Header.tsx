// components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import { Link, useMatchRoute } from '@tanstack/react-router';

const HeaderWrapper = styled.header`
    background-color: #333;
    color: white;
    padding: 15px;
    text-align: center;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: flex-start;
    gap: 20px;
`;

const StyledNavLink = styled(Link)<{ active: boolean }>`
    color: white;
    text-decoration: none;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    
    &:hover {
        text-decoration: underline;
    }
`;

const Header = () => {
    const matchRoute = useMatchRoute();

    return (
        <HeaderWrapper>
            <Nav>
                <StyledNavLink
                    to="/"
                    active={!!matchRoute({ to: '/' })}
                >
                    Photo
                </StyledNavLink>
                {/*<StyledNavLink to="/about" active={!!matchRoute({ to: '/about' })}>About</StyledNavLink>*/}
            </Nav>
        </HeaderWrapper>
    );
};

export default Header;
