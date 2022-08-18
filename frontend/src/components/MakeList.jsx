import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    ListProps,
  } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState,memo,useMemo,useRef } from "react"


export const MakeList =  ((props) => {
  
        if(props.chat.length === 0){
            return <UnorderedList><ListItem>チャットはまだありません！</ListItem></UnorderedList>
        }
        else {
            return (<UnorderedList>{props.chat.map((chat) => (<ListItem>{chat.name + ":" + chat.comment}
            </ListItem>))}</UnorderedList>
        );
        }
    }
);