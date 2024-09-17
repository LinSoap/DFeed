import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton, useEditableControls } from "@chakra-ui/react";

export const EditableControls = () => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return (
    isEditing && (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          backgroundColor="#f4f4f4"
          borderRadius={"12px"}
          boxShadow={"2px 2px 0px 0px black"}
          border={"2px solid"}
          {...getSubmitButtonProps()}
          aria-label="Save"
        />
        <IconButton
          icon={<CloseIcon />}
          backgroundColor="#f4f4f4"
          borderRadius={"12px"}
          boxShadow={"2px 2px 0px 0px black"}
          border={"2px solid"}
          {...getCancelButtonProps()}
          aria-label="Cancel"
        />
      </ButtonGroup>
    )
  );
};
