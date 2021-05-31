import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent bgColor="pGray.900">
        <ModalCloseButton />
        <ModalBody
          justifyContent="center"
          backgroundImage={`url('${imgUrl}')`}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          minH="600px"
          minW="900px"
        />

        <ModalFooter justifyContent="flex-start">
          <Link href={imgUrl} target="_blank" rel="noreferrer">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
