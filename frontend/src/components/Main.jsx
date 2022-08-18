import {Box,Input,Center,Flex,Button} from "@chakra-ui/react"
import {useRef,useState, memo,useEffect} from "react"
import React from "react"
import ReactPlayer from "react-player";
import { Aside } from "./Aside";

export const Main = memo(() => {

    const [Url, setUrl] = useState("");
    const [List, setList] = useState([]);
    const [Post, setPost] = useState("");

    const ref = useRef(true);
    
    const ChangeList = (url) => {
    const newList = [...List];
    newList.push(url);
    setList(newList);
    }

    useEffect(() =>{
        if(ref.current){
            ref.current = false;
            return;
        }

        fetch('/share', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: Url
            })
          }).then( (res) =>{
            console.log("送信");
          }
        )},[Post])

        const setGet = () => {fetch("/share").then((res) => res.json()).then((data) => setUrl(data.url))};


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
                    <ReactPlayer url={Url} controls={true} onStart= {() => {ChangeList(Url);}} />
                    <Button onClick={(event) => {
                        setPost(Url);
                    }}>動画の共有POST</Button>
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

