import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const handleNextClick = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };

  const handlePrevClick = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  if (count < PAGE_SIZE) return null;

  return (
    <StyledPagination>
      <Paragraph>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> &mdash;{" "}
        <span>{Math.min(currentPage * PAGE_SIZE, count)}</span> of{" "}
        <span>{count}</span> results.
      </Paragraph>

      <Buttons>
        {currentPage !== 1 && (
          <PaginationButton onClick={handlePrevClick}>
            <HiChevronLeft />
            <span>Previous</span>
          </PaginationButton>
        )}
        {currentPage !== pageCount && (
          <PaginationButton onClick={handleNextClick}>
            <span>Next</span>
            <HiChevronRight />
          </PaginationButton>
        )}
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  font-size: 0.875rem;
  margin-left: 0.5rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 0.875rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.25rem;
  }

  &:has(span:first-child) {
    padding-right: 0.25rem;
  }

  & svg {
    height: 1.125rem;
    width: 1.125rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
