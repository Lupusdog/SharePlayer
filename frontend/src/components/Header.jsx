import { Box,Heading,Flex,Center,Text,Input,Button} from "@chakra-ui/react"
import { memo, useState } from "react"

export const Header = memo (() => {

    const [Name, setName] = useState("No Name");

    return (
        <Flex>
            <Center>
                <Box padding="50px">
                    <Heading as="h1" size="xl">SharePlayer</Heading>
                    <Text>Youtube,Twitch,SoundCloud,Facebook,etc...</Text>
                </Box>
                <Box>
                    <Input w="150%" placeholder="ユーザー名を入力してください" onChange={
                        (event) => {
                            setName(event.target.value);
                        }
                    } />
                    <Button  margin="auto" colorScheme="blue"  onClick={(event) => {
                        fetch("/user",{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: Name 
                            })
                        })
                        }
                    }>登録</Button>
                </Box>
            </Center>
        </Flex>
    );
});
