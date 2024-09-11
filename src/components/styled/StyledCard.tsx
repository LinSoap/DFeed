import { Card, CardProps } from "@chakra-ui/react";

const StyledCard = ({
  children,
  ...props
}: { children: React.ReactNode } & CardProps) => {
  return (
    <Card
      borderRadius={"16px"}
      boxShadow={"4px 4px 0px 0px black"}
      border={"2px solid"}
      {...props}
    >
      {children}
    </Card>
  );
};

export default StyledCard;
