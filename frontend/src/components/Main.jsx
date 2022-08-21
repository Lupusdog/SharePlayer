import {Box,Input,Center,Flex,Button} from "@chakra-ui/react"
import {useRef,useState, memo,useEffect} from "react"
import React from "react"
import ReactPlayer from "react-player";
import { Aside } from "./Aside";


export const Main = memo(() => {

    const [Url, setUrl] = useState("");
    const [Time, setTime] = useState(0);
    //const [Post, setPost] = useState({});

    const stateRef = useRef(true);

    /*const ref = player => {
        this.player = player
      }
    */
    
    

    /*useEffect(() =>{
        if(stateRef.current){
            stateRef.current = false;
            return;
        }

        fetch('/share', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: Url,
              time: Time
            })
          }).then( (res) =>{
            console.log("送信");
          }
        )},[Time])*/

        const setGet = () => {fetch("/share").then((res) => res.json()).then((data) => {
            setUrl(data.url);
            setTime(data.time);
            this.player.seekTo(parseFloat(Time));
            }
        )};


    return(
        <Flex>
        <Box w="75%" h="450px" >
            <Input placeholder="再生したい動画のurlを貼り付けてください" onChange={
                (event) => {
                    setUrl(event.target.value);
                }
            } />
            <Center>
                <Box>
                    <ReactPlayer url={Url}  controls={true} onProgress={(state) => {
                        console.log("Progress");
                        setTime(state.playedSeconds);
                    }} />
                    <Button onClick={(event) => {
                        fetch('/share', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              url: Url,
                              time: Time
                            })
                          }).then( (res) =>{
                            console.log("送信");
                          }
                        )}
                        }>動画の共有POST</Button>
                    <Button onClick={(event) => {
                        setGet();
                    }}>動画の共有GET</Button>
                </Box>
            </Center>
        </Box>
        <Aside />
        </Flex>
    );
});

