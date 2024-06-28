import { Box, Button, Image, Input, InputGroup, InputLeftElement, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { IoIosSearch } from "react-icons/io";
import BoxContact from '../../components/BoxContact/BoxContact';
import { useDispatch, useSelector } from 'react-redux';
import "./ListContact.css"
import useToggleModalSucces from '../hooks/hooksModalSucces';
import useToggleModalDelete from '../hooks/hooksModalDelete';
import ModalSucces from '../../components/Modal/ModalSucces';
import ModalDelete from '../../components/Modal/ModalDelete';
import { setDetailContact } from '../../redux/slice/detailContact';
import { API_CALL_URL } from '../../helper';
import useToggleModalEdit from '../hooks/hooksModalEdit';
import ModalEdit from '../../components/Modal/ModalEdit';

const ListContact = () => {
  const dispatch = useDispatch()
  const [type, setType] = React.useState('number');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [photo, setPhoto] = React.useState('');
  const inputData = firstName+lastName+value+photo
  const [messageError, setMessageError] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [ageError, setAgeError] = React.useState('');
  const [photoError, setPhotoError] = React.useState('');
  const [detailContact, setInDetailContact] = React.useState([]);
  const { isOpenModalSucces, onToggleOpenModalSucces, onToggleCloseModalSucces } =
    useToggleModalSucces();
  const { isOpenModalEdit, onToggleOpenModalEdit, onToggleCloseModalEdit } =
    useToggleModalEdit();
  const { isOpenModalDelete, onToggleOpenModalDelete, onToggleCloseModalDelete } =
    useToggleModalDelete();
  const dataContact = useSelector((state) => {
    return state.listContact.contact;
  });
  console.log(typeof(value));
  console.log(detailContact.id);

  useEffect(() => {
    if(firstName){
      setFirstNameError('');
    }
    if(lastName){
      setLastNameError('');
    }
    if(value){
      setAgeError('');
    }
    if(photo){
      setPhotoError('');
    }
    if(firstName && lastName && value && photo){
      setMessageError('')
    }
  }, [inputData])

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

  const onCloseEdit = () => {
    onToggleCloseModalEdit()
    setType('text')
  }

  const handleFocus = () => {
    setType('date');
  };

  const handleBlur = () => {
    if (typeof(value) === "number") {
      setType('text');
    }
  };

  const checkPhoto = (url) => {
    return url.includes("http");
  };

  const onSetEdit = (data) => {
    onToggleOpenModalEdit()
    const idx = dataContact.findIndex((item) => item.id === data.id);
    const temp = [...dataContact];
    console.log(temp[idx]);
    setInDetailContact(temp[idx])
    setValue(temp[idx].age)
    setFirstName(temp[idx].firstName)
    setLastName(temp[idx].lastName)
    setPhoto(temp[idx].photo)
  }
  const onSetDelete = (data) => {
    onToggleOpenModalDelete()
    const idx = dataContact.findIndex((item) => item.id === data.id);
    const temp = [...dataContact];
    console.log(temp[idx]);
    setInDetailContact(temp[idx])
  }
  
  const validasiAge = type === 'date' ? calculateAge(value) : value
  console.log(validasiAge);

  const editContact = async () => {
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
      if (!value) {
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

      const response = await API_CALL_URL.put(
        `contact/${detailContact.id}`,{
          firstName: "",
          lastName: "",
          age: "",
          photo: ""
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Bad Request.')
    }
  };
  const deleteContact = async () => {
    try {
      const response = await API_CALL_URL.delete(
        `contact/${detailContact.id}`
      );
      // onToggleCloseModalDelete();
      console.log(response);
    } catch (error) {
      alert('Bad Request.')
    }
  };

  return (
    <div style={{ height: "100vh", overflowY:"scroll"}}>
      <Navbar>
        <div style={{ display: "flex", width: "auto", height: "auto", justifyContent: "center", alignItems: "center", flexDirection:"column", gap:"10px"}}>
          <Text style={{ fontSize:"18px", fontWeight:"700", color:"gray"}}>List Contact</Text>
          <InputGroup style={{ display:"flex", width:"40%" }}>
            <InputLeftElement pointerEvents='none'>
              <IoIosSearch color='gray.300'/>
            </InputLeftElement>
            <Input style={{ cursor:"pointer" }} type='text' placeholder='Search Contact with Id/FirstName/LastName/Age' />
          </InputGroup>
          {dataContact.map((val, idx)=>{
            console.log(checkPhoto(val.photo))
            return(
              <>
                <BoxContact Image={checkPhoto(val.photo)? val.photo : "https://i.pinimg.com/564x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg"} firstName={val.firstName} lastName={val.lastName} Age={`${val.age} Years`} onEdit={() => onSetEdit(val)} onDelete={() => onSetDelete(val)}/>
              </>
            )
          })}
        </div>
      </Navbar>
      {onToggleOpenModalSucces? 
        (<ModalSucces
          isOpen={isOpenModalSucces}
          onClose={onToggleCloseModalSucces}
          onClick={onToggleCloseModalSucces}
          judul="Succes Create Contact."
          >You can next to List Contact</ModalSucces>) 
          : 
        ("")}
      {onToggleOpenModalEdit ? (
        <ModalEdit
          isOpen={isOpenModalEdit}
          onClose={onCloseEdit}
          onClick={editContact}
          errorFirstName={firstNameError}
          valueFirstName={firstName}
          changeFirstName={(e) => setFirstName(e.target.value)}
          errorLastName={lastNameError}
          valueLastName={lastName}
          changeLastName={(e) => setLastName(e.target.value)}
          errorAge={ageError}
          valueBirthday={value}
          changeBirthday={(e) => setValue(e.target.value)}
          handleFocusBirthday={handleFocus}
          handleBlurBirthday={handleBlur}
          typeBirthday={type}
          errorPhoto={photoError}
          valuePhoto={photo}
          changePhoto={(e) => setPhoto(e.target.value)}
          errorMassage={messageError}
          msgError={messageError}
        />
      ) : (
        ""
      )}
      {onToggleOpenModalDelete? 
        (<ModalDelete
          isOpen={isOpenModalDelete}
          onClose={onToggleCloseModalDelete}
          onClick={deleteContact}
          namaProduk={`${detailContact.firstName} ${detailContact.lastName}`}
          />) 
          : 
        ("")}
    </div>
  )
}

export default ListContact
