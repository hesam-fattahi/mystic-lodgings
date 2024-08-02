import styled from "styled-components";

const Section = ({ children }) => {
  return <StyledSection>{children}</StyledSection>;
};

const StyledSection = styled.section`
  & h2 {
    margin-bottom: 1.25rem;
  }
`;

export default Section;
