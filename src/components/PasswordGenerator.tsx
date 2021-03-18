import React from "react";
import {
  Button,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  HStack,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { usePw } from "../hooks/usePw";
import { useToggle } from "../hooks/useToggle";
import { useCopyToast } from "../hooks/useCopyToast";

export function PasswordGenerator() {
  const [length, setLength] = React.useState<number>(32);
  const [shouldIncludeUpper, toggleShouldIncludeUpper] = useToggle();
  const [shouldIncludeNumber, toggleShouldIncludeNumber] = useToggle();
  const [shouldIncludeSymbol, toggleShouldIncludeSymbol] = useToggle();

  const option = {
    length,
    shouldIncludeNumber,
    shouldIncludeSymbol,
    shouldIncludeUpper,
  };
  const [pw, generate] = usePw(option);
  const handleClickPw = useCopyToast(pw);

  return (
    <Center height="100vh" bg="purple.900">
      <Stack
        boxShadow="0 10px 25px black"
        minWidth="400"
        maxWidth="400"
        bg="purple.50"
        borderRadius="10"
        p="5"
      >
        <Text fontSize="3xl" color="purple.700" fontWeight="900" align="center">
          Password Genererator
        </Text>
        <Stack spacing="8">
          <Box
            align="center"
            height="200"
            overflowX="scroll"
            borderWidth="1px"
            borderColor="purple.100"
            borderRadius="10"
            p="5"
            _hover={{
              cursor: "pointer",
            }}
            onClick={handleClickPw}
          >
            <Text color="purple.400" wordBreak="break-all">
              {pw}
            </Text>
          </Box>
          <Box align="center">
            <Button onClick={generate} colorScheme="purple" w="100%">
              Generate
            </Button>
          </Box>
          <Stack spacing="1">
            <Text color="purple.700">Length</Text>
            <Slider value={length} onChange={setLength} max={1000} min={1}>
              <SliderTrack bg="purple.100">
                <SliderFilledTrack bg="purple" />
              </SliderTrack>
              <SliderThumb boxSize={10}>
                <Box color="purple">{length}</Box>
              </SliderThumb>
            </Slider>
          </Stack>
          <HStack justifyContent="space-between">
            <Text color="purple.700">Include Uppercase?</Text>
            <Switch
              onChange={toggleShouldIncludeUpper}
              isChecked={shouldIncludeUpper}
              colorScheme="purple"
            />
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="purple.700">Include number?</Text>
            <Switch
              onChange={toggleShouldIncludeNumber}
              isChecked={shouldIncludeNumber}
              colorScheme="purple"
            />
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="purple.700">Include symbol?</Text>
            <Switch
              onChange={toggleShouldIncludeSymbol}
              isChecked={shouldIncludeSymbol}
              colorScheme="purple"
            />
          </HStack>
        </Stack>
      </Stack>
    </Center>
  );
}
