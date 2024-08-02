import styled from "styled-components";

function Empty({ resource }) {
  return <EmptyMessage>No {resource} could be found.</EmptyMessage>;
}

const EmptyMessage = styled.p`
  width: 100%;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin: 2rem 0;
`;

export default Empty;
