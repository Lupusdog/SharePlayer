import {Box,Text,Input,Button} from "@chakra-ui/react"
import { MakeList } from "./MakeList"
import { memo,useState } from "react"
import { useEffect } from "react";

export const Aside = memo ((props) => {

  const [deltaTime, setTime] = useState(0);
  const [Comment, setComment] = useState("");
  const [Chat, setChat] = useState([]);

  useEffect(() => {
    fetch("/chat").then(res => res.json()).then(data => setChat(data.chat))
  })

  setInterval((args) => {
    if(deltaTime === 500){
      fetch("/chat").then(res => res.json()).then(data => setChat(data.chat))
      setTime(0);
    }
  },1)

  return(
    <Box  w="25%" h="450px" padding="50px">
      <Text>Chat</Text>
        <MakeList chat={Chat} />
        <Input placeholder="コメントを入力" onChange={(event) => {
          setComment(event.target.value);
        }}/>
        <Button colorScheme="blue" onClick={(event) => {
          fetch("/chat",{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                comment: Comment
              })
          }).then((res) => res.json()).then((data) => setChat(data.chat))
          setTime(0);
        }}>送信</Button>
    </Box>
  )
});