import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  return (
    <Table columns="minmax(4rem, 0.75fr) minmax(4rem, 2fr) minmax(5rem, 2fr) minmax(2.5rem, 1fr) minmax(2.5rem, 1fr) minmax(0.5rem, 0.5fr)">
      <Table.Header>
        <p></p>
        <p>Name</p>
        <p>Capacity</p>
        <p>Price</p>
        <p>Discount</p>
        <p></p>
      </Table.Header>
      <Menus>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Menus>
    </Table>
  );
};

export default CabinTable;
