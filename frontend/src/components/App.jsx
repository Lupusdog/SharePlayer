import {Center,Box} from "@chakra-ui/react"
import {memo} from "react"
import {Header} from "./Header"
import {Main} from "./Main"
import {Footer} from "./Footer"

export const App = memo(() => {
  return (
    <Center>
    <Box w="1200px">
      <Header />
      <Main />
      <Footer />
    </Box>
    </Center>
  );
});





