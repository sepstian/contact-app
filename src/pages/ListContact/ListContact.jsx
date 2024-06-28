import { Box, Button, Input, InputGroup, InputLeftElement, Text, Tooltip } from '@chakra-ui/react'
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
import { API_CALL_URL } from '../../helper';
import useToggleModalEdit from '../hooks/hooksModalEdit';
import ModalEdit from '../../components/Modal/ModalEdit';
import useToggleModalFail from '../hooks/hooksModalFail';
import ModalFailure from '../../components/Modal/ModalFail';
import useToggleModalDeleteSucces from '../hooks/hooksModalSuccesDelete';
import useToggleModalDeleteFail from '../hooks/hooksModalFailDeletes';
import useToggleModalInfoAccount from '../hooks/hooksModalInfoAccount';
import { getContact, setContact, setContactId, setContactSearch } from '../../redux/slice/listContact';
import ModalInfoAccount from '../../components/Modal/ModalInfoAccount';
import { HiIdentification } from "react-icons/hi2";
import axios from 'axios';

const ListContact = () => {
  const dispatch = useDispatch()
  const navIdContact = React.useRef(null);
  const [isBoxVisibleIdContact, setIsBoxVisibleIdContact] = React.useState(false);
  const [type, setType] = React.useState('number');
  const [searchContact, setSearchContact] = React.useState('');
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
  const [isContact, setIsContact] = React.useState([]);
  const { isOpenModalInfoAccount, onToggleOpenModalInfoAccount, onToggleCloseModalInfoAccount } =
    useToggleModalInfoAccount();
  const { isOpenModalSucces, onToggleOpenModalSucces, onToggleCloseModalSucces } =
    useToggleModalSucces();
  const { isOpenModalDeleteSucces, onToggleOpenModalDeleteSucces, onToggleCloseModalDeleteSucces } =
    useToggleModalDeleteSucces();
  const { isOpenModalEdit, onToggleOpenModalEdit, onToggleCloseModalEdit } =
    useToggleModalEdit();
  const { isOpenModalDelete, onToggleOpenModalDelete, onToggleCloseModalDelete } =
    useToggleModalDelete();
  const { isOpenModalFail, onToggleOpenModalFail, onToggleCloseModalFail } =
    useToggleModalFail();
  const { isOpenModalDeleteFail, onToggleOpenModalDeleteFail, onToggleCloseModalDeleteFail } =
    useToggleModalDeleteFail();
  const dataContact = useSelector((state) => {
    return state.listContact.contact;
  });

  useEffect(() => {
    if(dataContact.length === 0 && !searchContact){
      dispatch(getContact())
    }
    const getContactId = async () => {
      try {
        if(searchContact){
          // const response = await API_CALL_URL.get(`/contact/${searchContact}`); // IF USE ENV
          const response = await axios.get(`https://contact.herokuapp.com/contact/${searchContact}`);
          if(response.status === 200 || response.status === 201){
            dispatch(setContactId([response.data]))
          }
        }
      } catch (error) {
        ""
      }
    }
    getContactId()
  }, [searchContact])
  useEffect(() => {
    const getIsContact = async () => {
      try {
        // const response = await API_CALL_URL.get("/contact"); // IF USE ENV
        const response = await axios.get("https://contact.herokuapp.com/contact");
        setIsContact(response.data.data)
      } catch (error) {
        ""
      }
    }
    getIsContact()
  }, [])
  const getIsContact = async () => {
    try {
      // const response = await API_CALL_URL.get("/contact"); // IF USE ENV
      const response = await axios.get("https://contact.herokuapp.com/contact");
      setIsContact(response.data.data)
    } catch (error) {
      ""
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (navIdContact.current && !navIdContact.current.contains(event.target)) {
        setIsBoxVisibleIdContact(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const onSuksesEdit = () => {
    onToggleCloseModalSucces()
    onToggleCloseModalInfoAccount()
    dispatch(getContact())
    getIsContact()
  }
  const onSuksesDelete = () => {
    onToggleCloseModalDeleteSucces()
    onToggleCloseModalInfoAccount()
    dispatch(getContact())
    getIsContact()
  }

  const onIdContactSet = (data) => {
    const idx = isContact.findIndex((item) => item.id === data.id);
    const temp = [...isContact];
    setIsBoxVisibleIdContact(false)
    setSearchContact(temp[idx].id)
}

  const onSetInfoAccount = (data) => {
    onToggleOpenModalInfoAccount()
    const idx = dataContact.findIndex((item) => item.id === data.id);
    const temp = [...dataContact];
    setType('text')
    setInDetailContact(temp[idx])
    setValue(temp[idx].age)
    setFirstName(temp[idx].firstName)
    setLastName(temp[idx].lastName)
    setPhoto(temp[idx].photo)
  }
  const onSetEdit = (data) => {
    onToggleOpenModalEdit()
    const idx = dataContact.findIndex((item) => item.id === data.id);
    const temp = [...dataContact];
    setType('text')
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
    setType('text')
    setInDetailContact(temp[idx])
  }

  const onContact = (data) => {
    const containsNumber = (str, number) => {
      return str && str.includes(number.toString());
    };
    const ageStartsWith = (age, number) => {
      return age.toString().startsWith(number.toString());
    };

    const resultFirstName = isContact.filter((contacts) => {
      return contacts.firstName && (contacts.firstName.toLowerCase().includes(data.toLowerCase()) || contacts.firstName.toUpperCase().includes(data.toUpperCase()) || containsNumber(contacts.firstName, data));
    })
    const resultLastName = isContact.filter((contacts) => {
      return contacts.lastName && (contacts.lastName.toLowerCase().includes(data.toLowerCase()) || contacts.lastName.toUpperCase().includes(data.toUpperCase()) || containsNumber(contacts.lastName, data));
    })
    const resultAge = isContact.filter((contacts) => {
      return ageStartsWith(contacts.age, data) || containsNumber(contacts.firstName, data) || containsNumber(contacts.lastName, data);
    })
    const maxLength = Math.max(resultFirstName.length, resultLastName.length, resultAge.length);
    if (maxLength === resultFirstName.length) {
      dispatch(setContactSearch(resultFirstName));
    } else if (maxLength === resultLastName.length) {
      dispatch(setContactSearch(resultLastName));
    } else if (maxLength === resultAge.length) {
      dispatch(setContactSearch(resultAge));
    } else {
      dispatch(getContact());
    }
  }

  const handleSearch = (data) => {
    setSearchContact(data)
    onContact(data)
  }
  
  const validasiAge = type === 'date' ? calculateAge(value) : value

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

      if (!firstName || !lastName || !value || !photo) {
        setMessageError("Please ensure all fields are filled.")
      }else if(isValid) {
        setMessageError("")
        // const response = await API_CALL_URL.put( // IF USE ENV
        const response = await axios.put(
          `https://contact.herokuapp.com/contact/${detailContact.id}`,{
            firstName: firstName,
            lastName: lastName,
            age: validasiAge,
            photo: photo
          }
        );
        if(response.status === 201 || response.status === 200){
          onToggleCloseModalEdit()
          onToggleOpenModalSucces()
          dispatch(getContact())
        }else{
          onToggleCloseModalEdit()
          onToggleOpenModalFail()
          dispatch(getContact())
        }
      }
    } catch (error) {
      alert('Bad Request.')
    }
  };
  const deleteContact = async () => {
    try {
      // const response = await API_CALL_URL.delete( // IF USE ENV
      const response = await axios.delete(
        `https://contact.herokuapp.com/contact/${detailContact.id}`
      );
      if(response.status === 201 || response.status === 200){
        onToggleCloseModalDelete();
        onToggleOpenModalDeleteSucces()
        dispatch(getContact())
      }else{
        onToggleCloseModalDelete();
        onToggleOpenModalDeleteFail()
        dispatch(getContact())
      }
    } catch (error) {
      alert('Bad Request.')
    }
  };

  return (
    <div style={{ height: "97vh", overflowY:"scroll"}}>
      <Navbar>
        <div style={{ display: "flex", width: "auto", height: "auto", justifyContent: "center", alignItems: "center", flexDirection:"column", gap:"10px"}}>
          <Text style={{ fontSize:"18px", fontWeight:"700", color:"gray"}}>List Contact</Text>
          <Box style={{ display:"flex", width:"60%", gap:"10px", alignItems:"center", position:"relative"}}>
            <Box ref={navIdContact}>
              <Tooltip label='List ID' placement='left' borderRadius="12px" bg='blue.500' zIndex={1}>
                  <Button colorScheme='blue' style={{ display:"flex", width:"3rem", height:"3rem", borderRadius:"50%"}} onClick={() => setIsBoxVisibleIdContact(!isBoxVisibleIdContact)}>
                      <HiIdentification size={50} style={{ color:"white" }} />
                  </Button>
              </Tooltip>
              <Box className="result_list_id" style={{ backgroundColor:"white", position:"absolute", zIndex:"1", flexDirection:"column"}}>
                {
                  isContact?.map((val, id)=> {
                    return(
                      <Box className="box-search-list" style={{ display: isBoxVisibleIdContact === false ? "none":"flex", padding:"10px" }} key={id} onClick={() => onIdContactSet(val)}>{val.id}</Box>
                    )
                  })
                }
              </Box>
            </Box>
            <InputGroup style={{ display:"flex", }}>
              <InputLeftElement pointerEvents='none'>
                <IoIosSearch color='gray.300'/>
              </InputLeftElement>
              <Input value={searchContact} onChange={(e) => handleSearch(e.target.value)} style={{ cursor:"pointer" }} type='text' placeholder='Search Contact with Id/FirstName/LastName/Age' />
            </InputGroup>
          </Box>
          {dataContact?.map((val, idx)=>{
            return(
              <>
                <BoxContact Image={checkPhoto(val.photo)? val.photo : "https://i.pinimg.com/564x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg"} firstName={val.firstName} lastName={val.lastName} Age={`${val.age} Years`} onEdit={() => onSetEdit(val)} onDelete={() => onSetDelete(val)} onClick={() => onSetInfoAccount(val)}/>
              </>
            )
          })}
        </div>
      </Navbar>
      {onToggleOpenModalInfoAccount? 
        (<ModalInfoAccount
          isOpen={isOpenModalInfoAccount}
          onClose={onToggleCloseModalInfoAccount}
          onClick={onToggleCloseModalInfoAccount}
          photo={checkPhoto(photo)? photo : "https://i.pinimg.com/564x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg"}
          firstName={firstName}
          lastName={lastName}
          age={value}
          onEdit={() => onToggleOpenModalEdit()}
          onDelete={() => onToggleOpenModalDelete()}
          />) 
          : 
        ("")}
      {onToggleOpenModalSucces? 
        (<ModalSucces
          isOpen={isOpenModalSucces}
          onClose={onToggleCloseModalSucces}
          onClick={onSuksesEdit}
          judul="Succes Edit Contact."
          >Next to view new contacts</ModalSucces>) 
          : 
        ("")}
      {onToggleOpenModalDeleteSucces? 
        (<ModalSucces
          isOpen={isOpenModalDeleteSucces}
          onClose={onToggleCloseModalDeleteSucces}
          onClick={onSuksesDelete}
          judul="Succes Delete Contact."
          >Next to view contacts</ModalSucces>) 
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
        />) 
          : 
        ("")}
      {onToggleOpenModalDelete? 
        (<ModalDelete
          isOpen={isOpenModalDelete}
          onClose={onToggleCloseModalDelete}
          onClick={deleteContact}
          namaProduk={`${detailContact.firstName} ${detailContact.lastName}`}
          />) 
          : 
        ("")}
      {onToggleOpenModalFail? 
        (<ModalFailure
          isOpen={isOpenModalFail}
          onClose={onToggleCloseModalFail}
          onClick={onToggleCloseModalFail}
          judul= "Failed Edit Account."
          >Please check your input data.</ModalFailure>) 
          : 
        ("")}
      {onToggleOpenModalDeleteFail? 
        (<ModalFailure
          isOpen={isOpenModalDeleteFail}
          onClose={onToggleCloseModalDeleteFail}
          onClick={onToggleCloseModalDeleteFail}
          judul= "Failed Delete Action."
          >Please check your data.</ModalFailure>) 
          : 
        ("")}
    </div>
  )
}

export default ListContact
