import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Text, Box, Flex } from '@chakra-ui/react';
import { FaTimesCircle } from 'react-icons/fa';

const ModalFailure = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius="12px">
        <ModalHeader backgroundColor="#E53E3E" color="white" fontSize="4xl" fontWeight="bold" alignItems="center" justifyContent="center" py={6} borderRadius="12px">
          <FaTimesCircle style={{ marginRight: '10px' }} />
          Failed
        </ModalHeader>
        <ModalBody px={8} pb={6}>
          <Text fontSize="xl" fontWeight="bold" mb="1rem" textAlign="center">
            {props.judul}
          </Text>
          <Box fontSize="lg" textAlign="center">
            {props.children}
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center" py={6}>
          <Button colorScheme="red" onClick={props.onClick} width="8rem">
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalFailure;
