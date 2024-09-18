import { useState } from "react";
import { ButtonGroup, IconButton, Text, VStack } from "@chakra-ui/react";
import StyledInput from "../styled/StyledInput";
import { MdCheck, MdClose, MdDeleteForever } from "react-icons/md";

const TitleEditable = ({
  index,
  defaultValue,
  updateOpmlGroupTitle,
  onDelete,
}: {
  index: number;
  defaultValue: string;
  updateOpmlGroupTitle: any;
  onDelete: () => void;
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {isEdit ? (
        <VStack>
          <StyledInput
            textAlign={"center"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ButtonGroup justifyContent="center" size="sm">
            <IconButton
              icon={<MdCheck />}
              backgroundColor="#f4f4f4"
              borderRadius={"12px"}
              boxShadow={"2px 2px 0px 0px black"}
              border={"2px solid"}
              aria-label="Save"
              onClick={() => {
                updateOpmlGroupTitle(index, value);
                setIsEdit(false);
              }}
            />
            <IconButton
              icon={<MdClose />}
              backgroundColor="#f4f4f4"
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
              backgroundColor="#f4f4f4"
              borderRadius={"12px"}
              boxShadow={"2px 2px 0px 0px black"}
              border={"2px solid"}
              aria-label="Delete"
              onClick={() => {
                onDelete();
                setIsEdit(false);
              }}
            />
          </ButtonGroup>
        </VStack>
      ) : (
        <VStack align={"center"}>
          <button onClick={() => setIsEdit(true)}>
            <Text> {defaultValue} </Text>
          </button>
        </VStack>
      )}
    </>
  );
};

export default TitleEditable;
