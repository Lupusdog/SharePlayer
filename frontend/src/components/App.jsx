import {Center,Box} from "@chakra-ui/react"
import {Header} from "./Header"
import {Main} from "./Main"
import {Footer} from "./Footer"

export const App = () => {
  return (
    <Center>
    <Box w="1200px">
      <Header />
      <Main />
      <Footer />
    </Box>
    </Center>
  );
};





