import { Button, useTheme, ButtonProps } from "@chakra-ui/react";

const StyledButton = ({
  color,
  children,
  ...props
}: {
  color: "blue" | "red";
  children: React.ReactNode;
} & ButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      borderRadius={"100px"}
      border={"3px solid"}
      boxShadow={"4px 4px 0px 0px black"}
      _hover={{
        boxShadow: "7px 7px 0px 0px black",
      }}
      _active={{
        boxShadow: "0px 0px 0px 0px black",
      }}
      bg={theme.colors.custom.themeColor[color]}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
