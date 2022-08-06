import axios from 'axios';
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';

function App() {
    const [githubName, setGithubName] = useState("");
    const [githubInfo, setGithubInfo] = useState<undefined | any>(undefined);

    const GITHUB_BASE_URL = "https://api.github.com";

    return (
      <div>
        <h1>
          Github Search
        </h1>
        
        <div>
        <TextField
          id="search-bar"
          className="text"
          value={githubName}
          onChange={(prop: any) => {
            setGithubName
      (prop.target.value);
          }}
          label="Enter a Github username..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>

  
        <p>
          You have entered {githubName}
        </p>
          {githubInfo === undefined ? (
            <p>Github not found</p>
          ) : (
            <div id="Github-result">
              <img src={githubInfo.login} />
            </div>
          )}
      </div>
  );   

    function search(){
      axios.get(GITHUB_BASE_URL + "/users/" + githubName.toLowerCase())
      .then((res) => {
        setGithubInfo(res.data);
      })
      .catch((err) => {
        console.log("Github not found");
        setGithubInfo(undefined);
      });
  }
}

export default App;
