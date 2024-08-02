import styled from "styled-components";

const Stat = ({ title, value, percent }) => (
  <StatBox gap="0.5rem" items="center">
    <Price>
      {value}
      {percent && "%"}
    </Price>
    <Title>{title}</Title>
  </StatBox>
);

const StatBox = styled.div`
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  white-space: nowrap;
`;

const Title = styled.p`
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const Price = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;

export default Stat;
