import { IconButton, Tooltip } from "@chakra-ui/react";

const FloatIconButton = ({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactElement;
  label: string;
}) => {
  return (
    <Tooltip label={label}>
      <IconButton
        icon={icon}
        aria-label={label}
        zIndex="1000"
        onClick={onClick}
        backgroundColor="#f4f4f4"
        borderRadius={"16px"}
        boxShadow={"2px 2px 0px 0px black"}
        border={"2px solid"}
        _hover={{
          boxShadow: "4px 4px 0px 0px black",
        }}
      />
    </Tooltip>
  );
};

export default FloatIconButton;
