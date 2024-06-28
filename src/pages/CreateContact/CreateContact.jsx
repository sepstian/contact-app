import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Box, Button, Input, Text, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { API_CALL_URL } from '../../helper';
import useToggleModalSucces from '../hooks/hooksModalSucces';
import ModalSucces from '../../components/Modal/ModalSucces';
import { useNavigate } from 'react-router-dom';
import useToggleModalFail from '../hooks/hooksModalFail';
import ModalFailure from '../../components/Modal/ModalFail';
import { useDispatch } from 'react-redux';
import { getContact } from '../../redux/slice/listContact';

const CreateContact = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [photo, setPhoto] = React.useState('');
    const inputData = firstName+lastName+age+photo
    const [messageError, setMessageError] = React.useState('');
    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [ageError, setAgeError] = React.useState('');
    const [photoError, setPhotoError] = React.useState('');
    const { isOpenModalSucces, onToggleOpenModalSucces, onToggleCloseModalSucces } =
    useToggleModalSucces();
    const { isOpenModalFail, onToggleOpenModalFail, onToggleCloseModalFail } =
    useToggleModalFail();

    useEffect(() => {
      if(firstName){
        setFirstNameError('');
      }
      if(lastName){
        setLastNameError('');
      }
      if(age){
        setAgeError('');
      }
      if(photo){
        setPhotoError('');
      }
      if(firstName && lastName && age && photo){
        setMessageError('')
      }
    }, [inputData])

    const onCreate = async () => {
        const validasiAge = calculateAge(age)
        console.log(validasiAge);
        try {
            let isValid = true;
            if (!firstName) {
                setFirstNameError('Error');
                isValid = false;
            } else {
                setFirstNameError('');
            }
            if (!lastName) {
                setLastNameError('Error');
                isValid = false;
            } else {
                setLastNameError('');
            }
            if (!age) {
                setAgeError(-1);
                isValid = false;
            } else {
                setAgeError(0);
            }
            if (!photo) {
                setPhotoError('Error');
                isValid = false;
            } else {
                setPhotoError('');
            }

            if (!firstName || !lastName || !age || !photo) {
              setMessageError("Pastikan semua kolom terisi.")
            }else if(isValid) {
              setMessageError("")
              const response = await API_CALL_URL.post("/contact", {
                firstName: firstName,
                lastName: lastName,
                age: validasiAge,
                photo: photo
              });
              if(response.status === 201){
                onToggleOpenModalSucces()
              }else{
                onToggleOpenModalFail()
              }
              console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const calculateAge = (birthdate) => {
      const birthDate = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    };

    const onSucces = () => {
      onToggleCloseModalSucces()
      navigate('/contact-list')
      dispatch(getContact())
    }

    return (
        <div>
            <Navbar >
              <div style={{ display: "flex", width: "auto", height: "95vh", justifyContent: "center", alignItems: "center" }}>
                <Box style={{ display: "flex", width: "30em", height: "33rem", justifyContent: "flex-start", flexDirection: "column", gap: "0.8rem", padding: "10px 50px", borderRadius: "12px", backgroundColor: "white", border: "2px solid rgb(240, 243, 247)" }}>
                    <Text style={{ display: "flex", fontSize: "2.6rem", color: "rgb(49, 130, 206)", fontWeight: "400" }}>Create Contact</Text>

                    <FormControl isRequired isInvalid={firstNameError !== ''}>
                        <FormLabel>First Name</FormLabel>
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                    </FormControl>

                    <FormControl isRequired isInvalid={lastNameError !== ''}>
                        <FormLabel>Last Name</FormLabel>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                    </FormControl>

                    <FormControl isRequired isInvalid={ageError === -1}>
                        <FormLabel>Birthday</FormLabel>
                        <Input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Birthday" type="date" />
                    </FormControl>

                    <FormControl isRequired isInvalid={photoError !== ''}>
                        <FormLabel>Choose Photo</FormLabel>
                        <Input value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Example: https://photo or http://photo" />
                    </FormControl>

                    <FormControl isRequired isInvalid={messageError !== ''}>
                      <Button style={{ display: "flex", width:"100%", color: "white", fontSize: "1.5rem", fontWeight: "400", marginTop: "1rem" }} colorScheme="blue" variant="solid" size="lg" onClick={onCreate}>Create</Button>
                      <FormErrorMessage>{messageError}</FormErrorMessage>
                    </FormControl>
                </Box>
              </div>
            </Navbar>
          {onToggleOpenModalSucces? 
            (<ModalSucces
              isOpen={isOpenModalSucces}
              onClose={onToggleCloseModalSucces}
              onClick={onSucces}
              judul="Succes Create Contact."
              >You can next to List Contact</ModalSucces>) 
              : 
            ("")}
          {onToggleOpenModalFail? 
            (<ModalFailure
              isOpen={isOpenModalFail}
              onClose={onToggleCloseModalFail}
              onClick={""}
              judul= "Fail Create Contact."
              >Please check your input data.</ModalFailure>) 
              : 
              ("")}
        </div>
    );
};

export default CreateContact;
