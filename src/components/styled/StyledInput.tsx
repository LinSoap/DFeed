import { Input, InputProps } from "@chakra-ui/react";

const StyledInput = ({
  children,
  ...props
}: { children?: React.ReactNode } & InputProps) => {
  return (
    <Input
      focusBorderColor="#e40872"
      border={"2px solid"}
      _hover={{ borderColor: "#e40872" }}
      _focus={{ borderColor: "e40872" }}
      {...props}
    >
      {children}
    </Input>
  );
};

export default StyledInput;
