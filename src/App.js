import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [username, setUsername] = useState('');
  const [resData, setResData] = useState('');

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    
    fetch('https://api.github.com/users/' + username)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResData(data);
    });
    
    setUsername('');
  }



  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit} className='formCard'>
          <input type="text" placeholder="search me" onChange={handleUsernameInput} value={username}/>
          <button>Submit</button>
        </form>

        {resData.message}

        { resData && (resData.message != 'Not Found') && (
            <div className='userDetailCard'>
              <div className='userDetailBody'>
                <p className='name'>{resData.name}</p>
                <em className='username'>{resData.login}</em>
                <div className='follow'>
                  <p>Followers : {resData.followers}</p>
                  <p>Following : {resData.following}</p>
                </div>
                <div className='profDetail'>
                  <p>🏢 {resData.company}</p>
                  <p>Bio : {resData.bio}</p>
                  <p>Blog : {resData.blog}</p>
                  <p>Location : {resData.location}</p>
                  <p>Public-Repos : {resData.public_repos}</p>
                  <p>Twitter-Username : {resData.twitter_username}</p>
                  <p>Email : {resData.email}</p>



                  

                </div>
              </div>
              <div className='userImage'>
                <img src={resData.avatar_url} alt="profile-img" />
              </div>
            </div>
          )
        }

      </div>
    </>
  );
}

export default App;
