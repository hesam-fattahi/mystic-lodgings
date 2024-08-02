import styled from "styled-components";
import Row from "../../ui/Row";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import AddCabin from "./AddCabin";

const CabinOperations = () => (
  <StyledCabinOperations justify="space-between" items="center">
    <Filter
      value="discount"
      options={[
        { value: "all", label: "All" },
        { value: "with-discount", label: "With discount" },
        { value: "no-discount", label: "No discount" },
      ]}
    />
    <Row items="center">
      <Sort
        options={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "price-asc", label: "Price (Low to High)" },
          { value: "price-desc", label: "Price (High to Low)" },
          { value: "capacity-asc", label: "Capacity (Low to High)" },
          { value: "capacity-desc", label: "Capacity (High to Low)" },
        ]}
      />
      <AddCabin />
    </Row>
  </StyledCabinOperations>
);

const StyledCabinOperations = styled(Row)`
  width: 100%;
  margin-bottom: 1rem;
`;

export default CabinOperations;
