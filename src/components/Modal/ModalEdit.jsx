import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react'

const ModalEdit = (props) => {
  return (
    <Modal isOpen={props.isOpen} size={"xl"} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent >
      <ModalHeader>Edit Contact</ModalHeader>
        <ModalCloseButton height={"40px"} width={"40px"} borderRadius={"100px"}/>
        <ModalBody>
          <Box
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              gap: '0.8rem',
              padding: '10px 50px',
              borderRadius: '12px',
              backgroundColor: 'white',
              border: '2px solid rgb(240, 243, 247)'
            }}
          >
            <FormControl isRequired isInvalid={props.errorFirstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                value={props.valueFirstName}
                onChange={props.changeFirstName}
                placeholder="First Name"
              />
            </FormControl>

            <FormControl isRequired isInvalid={props.errorLastName}>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={props.valueLastName}
                onChange={props.changeLastName}
                placeholder="Last Name"
              />
            </FormControl>

            <FormControl isRequired isInvalid={props.errorAge}>
              <FormLabel>{props.typeBirthday === 'date' ? `Birthday` : 'Age'}</FormLabel>
              <Input
                value={props.valueBirthday}
                onChange={props.changeBirthday}
                placeholder={props.typeBirthday === 'date' ? `Birthday` : 'Age'}
                type={props.typeBirthday}
                onFocus={props.handleFocusBirthday}
                onBlur={props.handleBlurBirthday}
              />
            </FormControl>

            <FormControl isRequired isInvalid={props.errorPhoto}>
              <FormLabel>Choose Photo</FormLabel>
              <Input
                value={props.valuePhoto}
                onChange={props.changePhoto}
                placeholder="Example: https://photo or http://photo"
              />
            </FormControl>

            <FormControl isInvalid={props.errorMassage}>
              <FormErrorMessage>{props.msgError}</FormErrorMessage>
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClick}>
            Save
          </Button>
          <Button variant="ghost" onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEdit
