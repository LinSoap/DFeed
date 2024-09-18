import { useState } from "react";
import { ButtonGroup, IconButton, useTheme, VStack } from "@chakra-ui/react";
import StyledInput from "../styled/StyledInput";
import { MdCheck, MdClose, MdDeleteForever } from "react-icons/md";
import { useOpml } from "../providers/OpmlProvider";
import StyledHeading from "../styled/StyledHeading";

const TitleEditable = ({
  index,
  defaultValue,
}: {
  index: number;
  defaultValue: string;
}) => {
  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);
  const [isEdit, setIsEdit] = useState(false);

  const { updateOpmlGroupTitle, deleteOpmlGroup } = useOpml();

  const isSubmitDisabled = value.trim().length === 0;

  return (
    <>
      {isEdit ? (
        <VStack>
          <StyledInput
            fontSize={"24px"}
            fontFamily={"Poppins"}
            textAlign={"center"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ButtonGroup justifyContent="center" size="sm">
            <IconButton
              icon={<MdCheck />}
              backgroundColor={theme.colors.custom.themeColor["gray"]}
              borderRadius={"12px"}
              boxShadow={"2px 2px 0px 0px black"}
              border={"2px solid"}
              aria-label="Save"
              isDisabled={isSubmitDisabled}
              onClick={() => {
                updateOpmlGroupTitle(index, value);
                setIsEdit(false);
              }}
            />
            <IconButton
              icon={<MdClose />}
              backgroundColor={theme.colors.custom.themeColor["gray"]}
              borderRadius={"12px"}
              boxShadow={"2px 2px 0px 0px black"}
              border={"2px solid"}
              aria-label="Cancel"
              onClick={() => {
                setIsEdit(false);
              }}
            />
            <IconButton
              icon={<MdDeleteForever />}
              backgroundColor={theme.colors.custom.themeColor["gray"]}
              borderRadius={"12px"}
              boxShadow={"2px 2px 0px 0px black"}
              border={"2px solid"}
              aria-label="Delete"
              onClick={() => {
                deleteOpmlGroup(index);
                setIsEdit(false);
              }}
            />
          </ButtonGroup>
        </VStack>
      ) : (
        <VStack align={"center"}>
          <button onClick={() => setIsEdit(true)}>
            <StyledHeading fontSize={"3rem"}>{defaultValue}</StyledHeading>
          </button>
        </VStack>
      )}
    </>
  );
};

export default TitleEditable;
