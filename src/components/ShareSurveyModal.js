import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useClipboard
} from "@chakra-ui/react";

const ShareSurveyModal = ({ isOpen, onClose, link }) => {
  const { hasCopied, onCopy } = useClipboard(link);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share Survey</ModalHeader>
        <ModalBody>
          <Input value={link} isReadOnly />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCopy} colorScheme="blue" mr={3}>
            {hasCopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareSurveyModal;
