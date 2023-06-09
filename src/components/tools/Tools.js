import axios from "axios";
import React, { useEffect, useState } from "react";
import AddTool from './AddTool'
import ListTools from "./ListTools";
import ShowTool from "./ShowTool"
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Search from "../Search";
import Header from "../Header";


const Tools = (props) => {

  const [view, setView] = useState('list')
  const [tools, setTools] = useState([])
  const [oneTool, setOneTool] = useState({})
  const [showAdd, setShowAdd] = useState(false)

  const getTools = () => {
    axios.get('https://cc-api.herokuapp.com/tools').then((response) => {
      setTools(response.data)
    })
  }
  const getOneTool = (id) => {
    axios.get('https://cc-api.herokuapp.com/tools/' + id).then((response) => {
      setOneTool(response.data)
    })
  }
  const createTool = (newTool) => {
    axios.post('https://cc-api.herokuapp.com/tools', newTool).then((response) => {
      console.log(response)
    })
  }
  const showList = () => {
    setView('list')
  }
  const showTool = (id) => {
    getOneTool(id)
    showToolView(id)
  }
  const showToolView = (id) => {
    setView(id)
  }

  const toggleShowAdd = () => {
    setShowAdd(!showAdd)
  }

  useEffect(() => {
    getTools()
  }, [])



  return (
    <>
    <Header setView={setView} setMainView={props.setMainView} />
      <Grid item xs={9} textAlign="center" style={{ backgroundPosition: "center", backgroundImage: "url(https://i.pinimg.com/originals/22/29/31/2229318c6c83e6cc6bd5443ba09d29e8.jpg)", top: "20px", height: "8rem", maxWidth: "25rem", margin: "auto", borderRadius: "0 0 8px 8px" }}>
      <Typography mt={5} variant="h3" fontFamily="tilt prism" fontWeight="500"  color='primary.light'>Tools</Typography>
      </Grid>
      <Grid item container justifyContent="space-between" xs={12}>
        <Grid item m={2} xs={8}>
            <Button variant="contained" onClick={toggleShowAdd}>Add Tool</Button>
        </Grid>
      <Search showList={showList} setTools={setTools} />
      </Grid>
      
      {showAdd ?
        <AddTool showAdd={showAdd} toggleShowAdd={toggleShowAdd} createTool={createTool} />
        : null}
      {view === 'list' ?
        <ListTools showTool={showTool} tools={tools} />
        :
        <ShowTool getOneTool={getOneTool} getTools={getTools} showList={showList} tool={oneTool} />
      }
    </>
  )
}

export default Tools