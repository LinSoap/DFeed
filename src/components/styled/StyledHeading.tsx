import { Heading, HeadingProps, useTheme } from "@chakra-ui/react";

const StyledHeading = ({
  children,
  ...props
}: { children?: React.ReactNode } & HeadingProps) => {
  const theme = useTheme();
  return (
    <Heading
      {...props}
      textShadow={"2px 2px 0  black"}
      color={theme.colors.custom.themeColor["blue"]}
      fontFamily={"Clashdisplay"}
      style={{
        WebkitTextStrokeWidth: "1px",
        WebkitTextStrokeColor: "black",
      }}
    >
      {children}
    </Heading>
  );
};

export default StyledHeading;
