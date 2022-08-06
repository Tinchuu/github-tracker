import axios from 'axios';
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import { time } from 'console';

function Search() {
    const [githubName, setGithubName] = useState("");
    const [githubInfo, setGithubInfo] = useState<undefined | any>(undefined);

    const GITHUB_BASE_URL = "https://api.github.com";

    return (
        <div className="search">
          
          <div className="search-menu">
            <TextField
              id="search-bar"
              className="text"
              value={githubName}
              onChange={(prop: any) => {
                setGithubName(prop.target.value);
              }}
              label="Enter a Github username..."
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
            <IconButton aria-label="search" onClick={() => {
                search();
              }}>
              <SearchIcon style={{ fill: "blue" }} />
            </IconButton>

            <Box component="span" sx={{height:50, display: 'block'}}>
            </Box>
          
              {githubInfo === undefined ? (
                <p>Github not found</p>
              ) : (
                <div id="Github-result">
                  <Box className= "content-top" component="span" sx={{height:40, display: 'block'}}>
                    <a href={githubInfo.html_url} target="_blank">{githubName}</a>
                  </Box>
                  <Box className= "content" component="span" sx={{height:200, display: 'block'}}>
                    <img className="profile" src={githubInfo.avatar_url} />
                  </Box>
                  <Box className= "content" component="span" sx={{height:20, display: 'block'}}>
                    Github id: {githubInfo.id}
                  </Box>
                  <Box className= "content" component="span" sx={{height:20, display: 'block'}}>
                    Public Repos: {githubInfo.public_repos}
                  </Box>
                  <Box className= "content" component="span" sx={{height:20, display: 'block'}}>
                    Following: {githubInfo.following}
                  </Box>
                  <Box className= "content" component="span" sx={{height:20, display: 'block'}}>
                    Followers: {githubInfo.followers}
                  </Box>
                  <Box className= "content" component="span" sx={{height:20, display: 'block'}} >
                    Created: {githubInfo.created_at}
                  </Box>
                </div>
              )}


          </div>
      </div>
  );   

function search(){
    axios.get(GITHUB_BASE_URL + "/users/" + githubName.toLowerCase()).then((res) => {
      setGithubInfo(res.data);
    }).catch((err) => {
      console.log("Github not found");
      setGithubInfo(undefined);
    });
  }
}

export default Search;
