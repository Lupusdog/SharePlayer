import {Box,Input,Center,Flex,Button} from "@chakra-ui/react"
import {useState, memo} from "react"
import React from "react"
import ReactPlayer from "react-player";
import { Aside } from "./Aside";


export const Main = memo(() => {

    const [Url, setUrl] = useState("");
    const [Time, setTime] = useState(0);
    //通常の定数で保管するとPlayerの挙動に問題が出るため、useStateを使用。
    const [ref,setRef] = useState(React.createRef())

        
    const setGet = () => {fetch("/share").then((res) => res.json()).then((data) => {
            console.log(data.time);
            setUrl(data.url);
            ref.current.seekTo(data.time);
            }
        )};

    return(
        <Flex>
            <Box w="75%" h="550px" >
                <Input placeholder="再生したい動画のurlを貼り付けてください" onChange={
                    (event) => {
                        setUrl(event.target.value);
                    }
                } />
                <Center>
                    <Box>
                        <ReactPlayer  height={450} url={Url}  controls={true} playing={true} ref={ref} onProgress={(state) => {
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

