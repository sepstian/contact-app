import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ModalInfoAccount = (props) => {
  return (
    <Modal isOpen={props.isOpen} size={"lg"} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account Information</ModalHeader>
        <ModalCloseButton height={"40px"} width={"40px"} borderRadius={"100px"}/>
        <ModalBody>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="10px 50px"
            borderRadius="12px"
            backgroundColor="white"
            border="2px solid rgb(240, 243, 247)"
          >
            <Image
              borderRadius="full"
              objectFit="cover"
              boxSize="150px"
              border="1.8px solid gray"
              src={props.photo}
              alt={`${props.firstName} ${props.lastName}`}
              marginBottom="1rem"
            />
            <Text fontSize="xl" fontWeight="bold" marginBottom="0.5rem">
              First Name: {props.firstName}
            </Text>
            <Text fontSize="xl" fontWeight="bold" marginBottom="0.5rem">
              Last Name: {props.lastName}
            </Text>
            <Text fontSize="lg" color="gray.500">
              Age: {props.age} Years
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Box display="flex" gap="20px">
            <Tooltip label='Edit' placement='bottom' borderRadius="12px" bg='orange.500' zIndex={1}>
              <Button colorScheme='orange' display="flex" width="3rem" height="3rem" borderRadius="50%" onClick={props.onEdit}>
                <FaEdit style={{ color: "white" }} />
              </Button>
            </Tooltip>
            <Tooltip label='Delete' placement='bottom' borderRadius="12px" bg='red.500' zIndex={1}>
              <Button colorScheme='red' display="flex" width="3rem" height="3rem" borderRadius="50%" onClick={props.onDelete}>
                <MdDelete style={{ color: "white" }} />
              </Button>
            </Tooltip>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalInfoAccount
