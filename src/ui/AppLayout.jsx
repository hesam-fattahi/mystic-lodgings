import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import styled from "styled-components";

const AppLayout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => setIsNavbarOpen((prev) => !prev);

  return (
    <Layout>
      <Header toggleNavbar={toggleNavbar} isNavbarOpen={isNavbarOpen} />
      <Navbar isOpen={isNavbarOpen} closeNav={toggleNavbar} />

      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
};

export default AppLayout;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "navbar header"
    "navbar main";
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }
`;

const Main = styled.main`
  grid-area: main;
  background-color: var(--color-grey-50);
  padding: 1rem 2rem 1.25rem;
  overflow-y: auto;
`;
