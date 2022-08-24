import {
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react';
import { memo} from "react"


export const MakeList =  memo ((props) => {
  
        if(props.chat.length === 0){
            return <UnorderedList><ListItem>チャットはまだありません！</ListItem></UnorderedList>
        }
        else {
            return (<UnorderedList>{props.chat.map((chat) => 
            (<ListItem>{chat.name + ":" + chat.comment}</ListItem>))
            }</UnorderedList>
            );
        }
    }
);