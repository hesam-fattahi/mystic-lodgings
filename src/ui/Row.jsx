import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.type === "vertical" ? "column" : "row")};
  gap: ${(props) => props.gap || "1rem"};
  justify-content: ${(props) => props.justify || "start"};
  align-items: ${(props) => props.items || "start"};
  margin-bottom: ${(props) => props.mb || 0};
  margin-top: ${(props) => props.mt || 0};
`;

export default Row;
