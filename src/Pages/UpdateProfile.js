import React, { useState } from 'react'
import { UserState } from '../Context';
import { useTheme } from '@mui/material/styles';
import { customAlphabet } from "nanoid";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BASEURL from '../constants';
import axios from "axios"
import './UpdateProfile.css'
import { useNavigate } from 'react-router-dom';
import { SyncOutlined } from '@ant-design/icons';

const UpdateProfile = () => {
  const navigate = useNavigate()

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  };

  const [imagePreview, setImagePreview] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const theme = useTheme();
  const [skills, setSkills] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const skillsList = [
    "Dveloper",
    "Artist",
    "Celebrity",
    "Engineer",
    "CEO",
    "CTO"
  ];

  const tagsList = [
    "Trending",
    "Now",
    "Popular",
    "Recent",
    "PAst",
    "Future"
  ];

  function getStyles(name, skills, theme) {
    return {
      fontWeight:
        skills.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  const { user, setUser } = UserState()
  const [values, setValues] = useState({
    name: user?.name,
    email: user?.email,
    contactNumber: user?.contactNumber,
    linkedInProfile: user?.linkedInProfile,
    currentCity: user?.currentCity,
    about: user?.about,
    currentOrganization: user?.currentOrganization,
    department: user?.department,
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      }
      const { data } = await axios.put(`${BASEURL}/user/update-profile`, { ...values, image, skills, tags }, config)
      console.log({ data })
      navigate('/home')
    } catch (error) {
      navigate('/home')
    } finally {
      setLoading(false)
    }
  }

  const handleFile = async (e) => {
    setLoading(true)

    const nanoid = customAlphabet("1234567890ABCDEFHOY", 12);
    const uniqueId = nanoid();
    let file = e.target.files[0];
    let fileToBase64
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      fileToBase64 = event.target.result;
    };
    reader.readAsDataURL(file);
    let fileName = `profile/${uniqueId}.${file?.type?.split("/")[1]}`;
    try {
      const configuration = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      }
      const { data } = await axios.get(`${BASEURL}/util/pre-signed-url?key=${fileName}`, configuration)

      const datas = await axios.put(`${data.signedUrl}`, fileToBase64);
      console.log({ datas })
      setImage(fileName)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className='container container d-flex justify-content-center'>
        <div className='form-box-custom'>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            padding: '20px',
            borderBottom: '2px solid #ccc'
          }}>
            UPDATE PROFILE</h1>
          <form onSubmit={submitHandler}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <label style={{ color: "grey", fontSize: "12px" }}>Profile Picture</label>
                <TextField
                  margin="dense"
                  label=""
                  type="file"
                  placeholder="ProfilePicture"
                  fullWidth
                  variant="outlined"
                  name="file"
                  onChange={handleFile}
                />
              </Grid>
              <Grid item xs={6}>
                {imagePreview && (
                  <img src={imagePreview} alt={imagePreview} height="100px" style={{ borderRadius: "10%" }}></img>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>

                <div className='form-input' style={{ paddingBottom: "6px" }}>
                  <label style={{
                    fontWeight: 300,
                    fontSize: "14px",
                    marginBottom: "1px"
                  }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={user.email}
                    required
                    onChange={handleChange}
                    disabled
                  >
                  </input>
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Name"
                  type="text"
                  placeholder="Type your name"
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Phone Number"
                  placeholder={user.contactNumber}
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="contactNumber"
                  value={values.contactNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="LinkedIn Profile"
                  placeholder={user.linkedInProfile}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="linkedInProfile"
                  value={values.linkedInProfile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Current City"
                  placeholder={user.currentCity}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="currentCity"
                  value={values.currentCity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="About"
                  placeholder={user.about}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="about"
                  value={values.about}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Organization"
                  placeholder={user.currentOrganization}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="currentOrganization"
                  value={values.currentOrganization}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Department"
                  placeholder={user.department}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                />
              </Grid>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={skills}
                  onChange={handleSelectChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Skills" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {skillsList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, skills, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={tags}
                  onChange={handleTagsChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {tagsList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, tags, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant="contained" fullWidth disabled={loading}>
                {
                  loading ? <><SyncOutlined spin /></> :
                    "Update"
                }
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile