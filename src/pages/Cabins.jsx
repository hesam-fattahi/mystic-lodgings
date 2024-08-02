import Section from "../ui/Section";
import CabinTable from "../features/cabins/CabinTable";
import CabinOperations from "../features/cabins/CabinOperations";

function Cabins() {
  return (
    <Section>
      <h2>Cabins</h2>
      <CabinOperations />
      <CabinTable />
    </Section>
  );
}

export default Cabins;
