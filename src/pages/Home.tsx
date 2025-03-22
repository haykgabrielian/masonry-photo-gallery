import styled from 'styled-components';
import Layout from '../components/Layout';
import MasonryGrid from "../components/MasonryGrid";

const Container = styled.div``;

const Home = () => {
    return (
        <Layout>
            <Container>
                <MasonryGrid />
            </Container>
        </Layout>
    );
};

export default Home;
