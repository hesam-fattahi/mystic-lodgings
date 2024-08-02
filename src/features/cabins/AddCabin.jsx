import { HiMiniPlus as PlusIcon } from "react-icons/hi2";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";

const AddCabin = () => (
  <Modal>
    <Modal.Open opens="cabin-form">
      <Button variant="primary" size="small">
        <PlusIcon />
        <span>Add cabin</span>
      </Button>
    </Modal.Open>
    <Modal.Window name="cabin-form" title="Cabin Form">
      <CabinForm />
    </Modal.Window>
  </Modal>
);

export default AddCabin;
