import styled from "styled-components";
import {
  HiOutlineDocumentDuplicate as DuplicateIcon,
  HiOutlineTrash as DeleteIcon,
  HiOutlinePencil as EditIcon,
} from "react-icons/hi2";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CabinForm from "./CabinForm";

import useInsertCabin from "./useInsertCabin";
import useDeleteCabin from "./useDeleteCabin";

const CabinRow = ({ cabin }) => {
  const { id, name, description, capacity, price, discount, image } = cabin;
  const { insertCabin, isInserting } = useInsertCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const duplicateCabin = () =>
    insertCabin({
      name: `${name} - copy`,
      description,
      capacity,
      price,
      discount,
      image,
    });

  return (
    <Table.Row disabled={isInserting}>
      <Img src={image} alt={`${name} image`} />
      <Cabin>{name}</Cabin>
      <p>{capacity} guests</p>
      <Price>{formatCurrency(price)}</Price>
      <Discount>{discount ? formatCurrency(discount) : `-`}</Discount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="cabin-form">
              <Menus.Button icon={<EditIcon />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<DeleteIcon />}>Delete</Menus.Button>
            </Modal.Open>
            <Menus.Button icon={<DuplicateIcon />} onClick={duplicateCabin}>
              Duplicate
            </Menus.Button>
          </Menus.List>
          <Modal.Window name="confirm-delete" title="Delete Cabin">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteCabin(id)}
              isLoading={isDeleting}
            />
          </Modal.Window>
          <Modal.Window name="cabin-form">
            <CabinForm editingCabin={cabin} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

const Img = styled.img`
  display: block;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);
  border-radius: var(--border-radius-sm);
  margin: 0.25rem 0;
`;

const Cabin = styled.div`
  font-weight: 600;
`;

const Price = styled.div`
  font-weight: 600;
`;

const Discount = styled.div`
  color: var(--color-accent-green);
`;

export default CabinRow;
