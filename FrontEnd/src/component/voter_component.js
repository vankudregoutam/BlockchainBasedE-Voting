import React, {useState, useEffect} from 'react';
import candidateImage from '../candidate.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {getAllCandidate, putVote, votingStarted} from '../web3_functions'

function VoterComponent({account, contractInstance}) {

  const [totalCandidate, setTotalCandidate] = useState([]);
  const [votingStatus, setVotingStatus] = useState(false);

  useEffect(()=>{ 
    async function connect(){
      const status = await votingStarted(contractInstance, account)
      if(status.message){
        const arr = await getAllCandidate(contractInstance, account)
        setTotalCandidate(arr.message)
        setVotingStatus(true)
      }
    }
    setTimeout(connect, 1500);
  },[account, contractInstance])
  

  async function vote(candidate){
    let result = await putVote(contractInstance, account, candidate.candidateAddress);
    console.log("result:", result);
  }

  return (
    <div >
        <div className='banner-area' style={{marginBottom: 20, paddingTop: 15}} >
          <h1>WELCOME TO ELECTION</h1>
        </div>
        <div className='gird-container'>
          {
            votingStatus === false ? 
            <>
              <h2>Voting not started.........................................</h2>
            </>
            :
            totalCandidate.map((candidate)=>{
              return(
                <Card sx={{ maxWidth: 380, float: "left", marginLeft: 8, marginBottom: 8 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      image={candidateImage}
                      alt="green iguana"
                      style={{paddingTop: 20}}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {candidate.name} 
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {candidate.age}<br/>
                        {candidate.address}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button variant="contained" onClick={(e)=>vote(candidate)}>Vote</Button>
                  </CardActions>
                </Card>
              )
            })
          }
        </div>
      </div>
      
  );
}

export default VoterComponent;
