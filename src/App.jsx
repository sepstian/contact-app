import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import CreateContact from './pages/CreateContact/CreateContact'
import { useDispatch } from 'react-redux'
import { getContact } from './redux/slice/listContact'
import ListContact from './pages/ListContact/ListContact'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() =>{
    dispatch(getContact())
    navigate('/')
  }, [])


  return (
    <>
      <Routes>
        <Route path='*' element={""}/>
        <Route path='/' element={<CreateContact/>}/>
        <Route path='/contact-list' element={<ListContact/>}/>
      </Routes>
    </>
  )
}

export default App
