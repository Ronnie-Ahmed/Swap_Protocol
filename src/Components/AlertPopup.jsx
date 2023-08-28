import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import nfticon from "../assets/DEFI.jpg";

export const AlertPopup = ({ shortText, description }) => {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      rounded="lg"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontWeight="bold" fontSize="4xl">
        {shortText}
      </AlertTitle>
      {/* <AlertDescription maxWidth="sm">{description}</AlertDescription> */}
    </Alert>
  );
};
