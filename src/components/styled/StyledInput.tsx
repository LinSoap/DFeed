import { Input, InputProps, useTheme } from "@chakra-ui/react";

const StyledInput = ({
  children,
  ...props
}: { children?: React.ReactNode } & InputProps) => {
  const theme = useTheme();
  const themeRed = theme.colors.custom.themeColor["red"];
  return (
    <Input
      focusBorderColor={themeRed}
      border={"2px solid"}
      _hover={{ borderColor: themeRed }}
      _focus={{ borderColor: themeRed }}
      {...props}
    >
      {children}
    </Input>
  );
};

export default StyledInput;
