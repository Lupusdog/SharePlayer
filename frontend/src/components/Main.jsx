import {Box,Input,Center,Flex,Button} from "@chakra-ui/react"
import {useRef,useState, memo,useEffect} from "react"
import React from "react"
import ReactPlayer from "react-player";
import { Aside } from "./Aside";


export const Main = memo(() => {

    const [Url, setUrl] = useState("");
    const [Time, setTime] = useState(0);
    //const [shareTime, setShareTime] = useState(0);
    const [ref,setRef] = useState(React.createRef())

        
        const setGet = () => {fetch("/share").then((res) => res.json()).then((data) => {
            console.log(data.time);
            setUrl(data.url);
            ref.current.seekTo(data.time);
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
                    <ReactPlayer url={Url}  controls={true} playing={true} ref={ref} onProgress={(state) => {
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

