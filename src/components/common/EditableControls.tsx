import { ButtonGroup, IconButton, useEditableControls } from "@chakra-ui/react";
import { MdCheck, MdClose, MdDeleteForever } from "react-icons/md";

export const EditableControls = ({ onDelete }: { onDelete: () => void }) => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        icon={<MdCheck />}
        backgroundColor="#f4f4f4"
        borderRadius={"12px"}
        boxShadow={"2px 2px 0px 0px black"}
        border={"2px solid"}
        {...getSubmitButtonProps()}
        aria-label="Save"
      />
      <IconButton
        icon={<MdClose />}
        backgroundColor="#f4f4f4"
        borderRadius={"12px"}
        boxShadow={"2px 2px 0px 0px black"}
        border={"2px solid"}
        {...getCancelButtonProps()}
        aria-label="Cancel"
      />
      <IconButton
        icon={<MdDeleteForever />}
        backgroundColor="#f4f4f4"
        borderRadius={"12px"}
        boxShadow={"2px 2px 0px 0px black"}
        border={"2px solid"}
        onClick={(e) => {
          console.log(e);
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Delete"
      />
    </ButtonGroup>
  ) : null;
};
