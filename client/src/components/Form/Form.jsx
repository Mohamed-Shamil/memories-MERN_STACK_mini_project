import React,{ useState,useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import Filebase from 'react-file-base64'
import { useDispatch,useSelector } from 'react-redux' 

import useStyles from './styles'
import {createPost, updatePost} from '../../actions/posts'
import axios from 'axios'



function Form({currentId, setCurrentId}) {
  const [postData, setPostData] = useState({ creator:"", title:"", message:"", tags:"", selectedFile:""})
  const post = useSelector((state)=> currentId? state.posts.find((p)=> p._id == currentId) : null)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(post) setPostData(post)
  },[post])

  const handleSubmit= async(e) =>{
      e.preventDefault()
      // const response = await axios.post("http://localhost:5000/posts",{postData})
      // console.log(response.data);
      
    if(currentId){

      dispatch(updatePost(currentId, postData))
    }else{
      dispatch(createPost(postData))
    }
    clear()
  }

  const clear = () =>{
      setCurrentId(null)
      setPostData({ creator:"", title:"", message:"", tags:"", selectedFile:""})
  }

  return (

    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} > 
          <Typography variant="h6" >{currentId ? 'Editing' : 'Creating' } a Memory </Typography>
          <TextField name='creator' variant='outlined' fullWidth value={postData.creator} label="Creator" onChange={(e)=> setPostData({ ...postData ,creator: e.target.value})}  />
          <TextField name='title' variant='outlined' fullWidth value={postData.title} label="Title" onChange={(e)=> setPostData({ ...postData ,title: e.target.value})} />
          <TextField name='message' variant='outlined' fullWidth value={postData.message} label="Message" onChange={(e)=> setPostData({ ...postData ,message: e.target.value})}  />
          <TextField name='tags' variant='outlined' fullWidth value={postData.tags} label="Tags" onChange={(e)=> setPostData({ ...postData ,tags: e.target.value.split(',')})} />
          <div className={classes.fileInput}> <Filebase type="file" multiple={false} onDone={({base64})=> setPostData({...postData, selectedFile: base64})}/> </div>
         <Button className={classes.buttonSubmit} variant="contained" color="primary" size='large' type='submit' fullWidth>Submit</Button>
         <Button  variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
          </form>
    </Paper>
    )

} 

export default Form
