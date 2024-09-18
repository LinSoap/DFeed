import {
  VStack,
  ButtonGroup,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  useTheme,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdCheck, MdClose, MdDeleteForever } from "react-icons/md";
import StyledInput from "../styled/StyledInput";
import { useOpml } from "../providers/OpmlProvider";

const PropEditable = ({
  _key,
  groupIndex,
  itemIndex,
  defaultValue,
}: {
  _key: string;
  groupIndex: number;
  itemIndex: number;
  defaultValue: string;
}) => {
  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);
  const [isEdit, setIsEdit] = useState(false);

  const necessaryProp = ["_text", "_xmlUrl"];

  const { updateOpmlListItem, deleteOpmlListItemProp } = useOpml();

  const isSubmitDisabled = value.trim().length === 0;

  return (
    <>
      {isEdit ? (
        <InputGroup size="md">
          <StyledInput
            fontFamily={"Poppins"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            pr="6rem"
          />
          <InputRightElement width="auto">
            <Box mr={2}>
              <ButtonGroup size="sm" spacing={1}>
                <IconButton
                  icon={<MdCheck />}
                  backgroundColor={theme.colors.custom.themeColor["gray"]}
                  borderRadius={"12px"}
                  boxShadow={"2px 2px 0px 0px black"}
                  border={"2px solid"}
                  aria-label="Save"
                  isDisabled={isSubmitDisabled}
                  onClick={() => {
                    updateOpmlListItem(groupIndex, itemIndex, _key, value);
                    setIsEdit(false);
                  }}
                  size="xs"
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
                  size="xs"
                />
                <IconButton
                  icon={<MdDeleteForever />}
                  backgroundColor={theme.colors.custom.themeColor["gray"]}
                  borderRadius={"12px"}
                  boxShadow={"2px 2px 0px 0px black"}
                  border={"2px solid"}
                  aria-label="Delete"
                  onClick={() => {
                    deleteOpmlListItemProp(groupIndex, itemIndex, _key);
                    setIsEdit(false);
                  }}
                  size="xs"
                  isDisabled={necessaryProp.includes(_key)}
                />
              </ButtonGroup>
            </Box>
          </InputRightElement>
        </InputGroup>
      ) : (
        <VStack align={"center"}>
          <button onClick={() => setIsEdit(true)}>
            <Text fontFamily={"Poppins"} fontSize={"1rem"}>
              {defaultValue}
            </Text>
          </button>
        </VStack>
      )}
    </>
  );
};

export default PropEditable;
