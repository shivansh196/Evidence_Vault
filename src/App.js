import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; //Web3 library for interacting with the Ethereum blockchain
import axios from 'axios';//interacting to ipfs api
import { ColorModeContext, useMode } from './theme';
import {
  Input,
  CssBaseline,
  ThemeProvider,
  Button,
  Box,
  Typography,
  Divider,
  List, ListItem, ListItemText,
  FormControl,
  InputLabel,
  Select,
  TextField
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import FileStorage from './contracts/FileStorage.json';//imports abi(Application Binary Interface)

import Topbar from './scenes/global/Topbar'
import Dashboard from "./scenes/dashboard";
import FAQ from "./scenes/faq";

const ipfsBaseURL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh"
];

function App() {
  const [theme, colorMode] = useMode();
  const [web3, setWeb3] = useState(null);
  const [fileStorage, setFileStorage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  let [prediction, setPrediction] = useState("");

  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line
  }, []);

  //Connecting the application to the user's Ethereum wallet
  //asyn funtion for the connection of wallet (usage of await)
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = FileStorage.networks[networkId];

        if (deployedNetwork) {
          const fileStorageInstance = new web3Instance.eth.Contract(
            FileStorage.abi,
            deployedNetwork.address
          );
          setFileStorage(fileStorageInstance);

          const accounts = await web3Instance.eth.getAccounts();
          setCurrentAccount(accounts[0]);
          loadFiles(accounts[0]);
        } else {
          alert('FileStorage contract not deployed on the current network. Please deploy the contract.');
        }
      } else {
        alert('MetaMask not detected. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error.message);
      alert('Error connecting to MetaMask. Please make sure MetaMask is installed, unlocked, and connected to the correct network.');
    }
  };

  const loadFiles = async (account) => {
    if (!fileStorage) return;

    try {
      const count = await fileStorage.methods.fileCount().call();
      const files = [];

      for (let i = 1; i <= count; i++) {
        const fileData = await fileStorage.methods.files(i).call();
        if (fileData.owner.toLowerCase() === account.toLowerCase()) {
          files.push(fileData);
        }
      }

      setUploadedFiles(files);
    } catch (error) {
      console.error('Error loading files:', error.message);
    }
  };

  const captureFile = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert('Please select a file.1');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log('file');
    try {
      const response = await axios.post('http://127.0.0.1:5000//predict_audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data.predictions);
      console.log(response.data.predictions);
      prediction = response.data.predictions;
      console.log(prediction);
      if (prediction === 'REAL') {
        setFile(file);
      }
      else {
        setFile(null);
      }

    } catch (error) {
      console.error('Error:', error);
      console.log("2");
      setPrediction(null);
    }
  };

  const uploadFile = async () => {
    if (!web3) {
      alert('Please connect MetaMask before uploading files.');
      return;
    }

    if (!file) {
      alert('Please select a file 2');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(ipfsBaseURL, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': '47796bab98d173552667',
          'pinata_secret_api_key': 'd052f79795a7dafcc6ed0603bd26ff2f25ac1ba523e21e9d25d7133d1d1fe030',
        },
      });

      const ipfsHash = response.data.IpfsHash;

      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];

      await fileStorage.methods.addFile(ipfsHash, file.name).send({ from: fromAddress });
      alert('File uploaded successfully!');

      // After uploading, reload the list of files
      loadFiles(fromAddress);
    } catch (error) {
      console.error('Error uploading to Pinata:', error.message);
      alert('Error uploading to Pinata. Please try again.');
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>

          <main className='content'>

            <Topbar connectWallet={connectWallet} />
            <Typography variant="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Evidence Vault</Typography>
            <CardMedia
              component="img"
              sx={{ width: '100%' }}
              image="https://res.cloudinary.com/duovtuwdd/image/upload/v1713614186/uacgdetmdqbsczvv0xcb.png"
              alt="Live Cloudinary"
            />

            {!currentAccount &&
              <>
                <Divider>LOGIN</Divider>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px',
                    margin: '20px',
                    minHeight: '300px',
                    backgroundColor: (theme.palette.mode === 'dark') ? '#84d1cf' : 'black',
                    color: (theme.palette.mode === 'dark') ? 'black' : 'white'
                  }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', margin: '20px' }}>
                    <CardContent sx={{ flex: '1 0 auto', alignContent: 'center', textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Login with MetaMask</Typography>
                      <Button onClick={connectWallet} variant="contained" sx={{ padding: '20px', margin: '20px' }}>MetaMask</Button>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: '30%' }}
                    image="https://res.cloudinary.com/duovtuwdd/image/upload/v1713611795/md3q4q8nhzyrfru5u6vt.png"
                    alt="Live cloudinary"
                  />
                </Card>
              </>
            }
            <Box className='boxclass'>
              {currentAccount && (
                <>
                  <Box sx={{
                    display: 'block',
                    justifyContent: 'center',
                    padding: '20px',
                    margin: '20px',
                    minHeight: '300px',
                    backgroundColor: (theme.palette.mode === 'dark') ? '#84d1cf' : 'black',
                    color: (theme.palette.mode === 'dark') ? 'black' : 'white',
                    borderRadius: '8px'
                  }}>
                    <Typography
                      variant='h3'
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>Crime Reporting Form
                    </Typography>

                    {/* Type of Crime */}
                    <FormControl fullWidth defaultValue="" sx={{ marginTop: '16px' }}>
                      <InputLabel sx={{color: 'black'}} htmlFor="crime-type">Type of Crime</InputLabel>
                      <Select
                        native
                        inputProps={{
                          name: 'crime-type',
                          id: 'crime-type',
                        }}
                      >
                        <option value=""></option>
                        <option value="violent">Violent</option>
                        <option value="property">Property</option>
                        <option value="cyber">Cyber</option>
                      </Select>
                    </FormControl>

                    {/* Name of State */}
                    <FormControl fullWidth sx={{ marginTop: '16px' }}>
                      <InputLabel sx={{color: 'black'}} htmlFor="state-name">Name of State</InputLabel>
                      <Select
                        native
                        inputProps={{
                          name: 'state-name',
                          id: 'state-name',
                        }}
                      >
                        <option value=""></option>
                        {/* Render options for all Indian states */}
                        {indianStates.map((state, index) => (
                          <option key={index} value={state}>{state}</option>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Location */}
                    <TextField
                      fullWidth
                      id="location"
                      label="Location"
                      variant="outlined"
                      margin="normal"
                      sx={{ marginTop: '16px',color: 'black'}}
                    />

                    {/* Description about Crime */}
                    <TextField
                      fullWidth
                      id="crime-description"
                      label="Description about Crime"
                      variant="outlined"
                      multiline
                      rows={4}
                      margin="normal"
                      sx={{ marginTop: '16px',color:'black' }}
                    />

                    <Divider textAlign="left" sx={{ marginTop: '16px' }}>Upload File</Divider>
                    <Input type="file" onChange={captureFile} />
                    <Button
                      sx={{ padding: '10px', margin: '8px',backgroundColor: 'blue' }}
                      onClick={uploadFile}
                      component="uploadFile"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                    </Button>
                  </Box>
                  <Typography variant="h5" sx={{ marginTop: '16px' }}>Uploaded Files</Typography>
                  <List>
                    {uploadedFiles.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`IPFS Hash: ${file.ipfsHash}, File Name: ${file.fileName}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>

              )}
              <Dashboard />
              <FAQ />
            </Box>

          </main>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;