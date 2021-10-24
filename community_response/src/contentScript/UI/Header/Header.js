import React from 'react';
import { Box ,Flex,Text} from "@chakra-ui/react"




const header = (props) => {
    //#2D3748
    return(
        <Flex w="100%" h="120px">
        <Flex bg="tomato" w="30%" color="white" >
            </Flex>
        <Flex bg="#2D3748" w="70%" color="white" alignItems="center">
            <Text fontSize="30px" m="-39px"> Community Response</Text>
            </Flex>
        </Flex>

        // <div className={styles.rectangle_bg}>
        //     <div className={styles.logo}></div>
        //     <h1 className={styles.s}> Community Response</h1>
        // </div>
       
    )

}

export default header;