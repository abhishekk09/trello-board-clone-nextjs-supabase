import Modal from "../../components/modal/modal";

import ModalCardDescription from "../../components/ModalCardDescription";

const Parallel = ({ params }) => {
  const { slug = "" } = params;
  return (
    <Modal>
      <ModalCardDescription cardId={slug} />
    </Modal>
  );
};

export default Parallel;
