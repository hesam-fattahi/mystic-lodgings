import styled from "styled-components";
import Input from "../ui/Input";
const FileInput = styled(Input)`
  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    margin-right: 0.75rem;
    border-radius: var(--border-radius-sm);
    border: none;
    background-color: var(--color-accent-purple);
    color: inherit;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;
  }
`;

export default FileInput;
