import { Box, Button, Image, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const BoxContact = (props) => {
    const handleEditClick = (event) => {
        event.stopPropagation();
        props.onEdit();
    };
    
    const handleDeleteClick = (event) => {
        event.stopPropagation();
        props.onDelete();
    };

  return (
    <>
        {/* <Tooltip label='Detail' placement='bottom-start' borderRadius="12px" bg='blue.500' fontSize="lg"> */}
            <Box className="box_contact" style={{ display: "flex", width: "85%", height: "6rem", justifyContent: "Space-between", alignItems:"center", gap: "1rem", padding: "10px 20px", borderRadius: "12px", backgroundColor: "white", border: "2px solid rgb(240, 243, 247)", cursor:"pointer", boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}} onClick={props.onClick}>
                <Box style={{ display:"flex", width:"auto", alignItems:"center", justifyContent:"flex-start", gap:"2rem"}}>
                    <Image boxSize="4rem" objectFit="cover" style={{ borderRadius:"50%", border: "1.8px solid gray" }} src={props.Image}/>
                    <Box style={{ display:"flex", width:"auto", fontSize:"18px", fontWeight:"600", justifyContent:"space-around", gap:"10px"}}>
                        <Text>{props.firstName}</Text>
                        <Text>{props.lastName}</Text>
                    </Box>
                    <Text style={{ fontWeight:'500', fontStyle:"italic"}}>||</Text>
                    <Text style={{ fontWeight:'500', fontStyle:"italic"}}>{props.Age}</Text>
                </Box>
                <Box style={{ display:"flex", width:"auto", gap:"20px"}}>
                    <Tooltip label='Edit' placement='bottom' borderRadius="12px" bg='orange.500' zIndex={1}>
                        <Button colorScheme='orange' style={{ display:"flex", width:"3rem", height:"3rem", borderRadius:"50%"}} onClick={handleEditClick}>
                            <FaEdit style={{ color:"white" }} />
                        </Button>
                    </Tooltip>
                    <Tooltip label='Delete' placement='bottom' borderRadius="12px" bg='red.500' zIndex={1}>
                        <Button colorScheme='red' style={{ display:"flex", width:"3rem", height:"3rem", borderRadius:"50%"}} onClick={handleDeleteClick}>
                            <MdDelete style={{ color:"white" }}/>
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        {/* </Tooltip> */}
    </>
  )
}

export default BoxContact
