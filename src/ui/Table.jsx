import { createContext, useContext } from "react";
import styled from "styled-components";

const TableContext = createContext();

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};

const Body = ({ children, data, render }) => {
  if (!data.length)
    return <Empty>There aren't any results to display at the moment.</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

const StyledTable = styled.div`
  width: 100%;
  font-size: 0.875rem;
  overflow-x: auto;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.5rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1rem 1.5rem;
  background-color: var(--color-bg-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  white-space: nowrap;
`;

const StyledRow = styled(CommonRow)`
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--color-bg-tertiary);

  &:last-child {
    border: none;
  }
`;

const StyledBody = styled.section`
  margin: 0.25rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-bg-tertiary);

  display: flex;
  justify-content: center;
  padding: 0.75rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 1.5rem;
`;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
