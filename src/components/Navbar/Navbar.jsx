import {Box, Image, Text} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { getContact } from "../../redux/slice/listContact";

const Navbar = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onToCreate = () => {
        dispatch(getContact())
        navigate("/")
    }
    const onToList = () => {
        dispatch(getContact())
        navigate("/contact-list")
    }

    return(
        <>
        {/* <div> */}
            <Box className="navbar" style={{display:"flex", justifyContent:"center", alignItems:"center", width:"auto", height:"4.5rem", backgroundColor:"white", borderBottom:"2px solid rgb(240, 243, 247)"}}>
                <Box style={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"98%", height:"70%", backgroundColor:"white"}}>
                    <Text style={{ fontSize:"20px", fontWeight:"700", cursor:"default"}}>Contact App</Text>
                    <Box style={{ display:"flex", gap:"20px" }}>
                        <Text color={location.pathname === "/" ? "rgb(49, 130, 206)" : "grey"} className="txt_navbar_contact" style={{ fontSize:"20px", fontWeight:"600", cursor:"pointer"}} onClick={onToCreate}>Create Contact</Text>
                        <Text color={location.pathname === "/contact-list" ? "rgb(49, 130, 206)" : "grey"} className="txt_navbar_contact" style={{ fontSize:"20px", fontWeight:"600", cursor:"pointer"}} onClick={onToList}>List Contact</Text>
                    </Box>
                </Box>
            </Box>
            {props.children}
        {/* </div> */}
        </>
    )
}

export default Navbar