import React from "react";
import { Box, Flex, Text, Center, VStack} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const f_data = {
  key: 2412,
  reviewed: 100,
  rating: 4,
  P_words: [
    {
      word: "Coolx",
      freq: 5,
    },
    {
      word: "Dumbf",
      freq: 6,
    },
  ],
  N_words: [{
    word: "Dumb",
    freq: 5,
  }],
};

function Data(props) {
  return (
    <Box
      bg="#181818"
      maxWidth="100%"
      height="20vh"
      color="white"
      alignItems="center"
      border="2px"
      borderColor="white"
    >
      <Box d="flex" pl="50px" alignItems="center">
        {Array(5)
          .fill(" ")
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < f_data.rating ? "#E53E3E" : "gray.300"}
              boxSize={20}
            />
          ))}
      </Box>

      <Box d="flex" mt={1} color="white" alignItems="center" pl="125px">
        Reviewed {f_data.reviewed} comments.
      </Box>

      <Flex btw="1px" btc="tomato" mw="100%" h="100px" color="white">
        <Box w="50%" border="2px" borderColor="white" bg="tomato">
          <Center w="100%">
            <Text fontSize="14px">Most Used Positive Words</Text>
          </Center>

          <ul style={{ listStyleType: "none" }}>
            {f_data.P_words.map((obj) => {

             return (
             <VStack spacing={8}>    
             <li key={obj.word} >
                 <Text color="white" padddingtop="4px" >{obj.word} : {obj.freq}</Text>
             </li>
             </ VStack>
             )

            })}
          </ul>
        </Box>

        <Box w="50%"  border="2px" borderColor="white" bg="teal">
          <Center w="100%">
            <Text fontSize="14px">Most Used Negative Words</Text>
          </Center>
          <ul style={{ listStyleType: "none" }}>
            {f_data.N_words.map((obj) => {

             return (
             <VStack spacing={8}>    
             <li key={obj.word} >
                 <Text color="white" padddingtop="2px">{obj.word} : {obj.freq}</Text>
             </li>
             </ VStack>
             )

            })}
          </ul>


        </Box>
        

      </Flex>
    </Box>
  );
}

export default Data;
