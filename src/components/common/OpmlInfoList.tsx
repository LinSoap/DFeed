import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  useEditableControls,
} from "@chakra-ui/react";
import OpmlInfoListItem from "./OpmlInfoListItem";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useOpml } from "../providers/OpmlProvider";

const OpmlInfoList = (opml: any) => {
  const header = opml.opml.opml.head;
  const body = opml.opml.opml.body;
  const { updateOpmlGroupTitle } = useOpml();

  const renderRssList = (outline: any) => {
    if (!outline.outline) {
      return null;
    }
    return Array.isArray(outline.outline) ? (
      outline.outline.map((item: any, index: number) => (
        <OpmlInfoListItem rssItem={item} key={index} />
      ))
    ) : (
      <OpmlInfoListItem rssItem={outline.outline} />
    );
  };

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return (
      isEditing && (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton
            icon={<CheckIcon />}
            {...getSubmitButtonProps()}
            aria-label="Save"
          />
          <IconButton
            icon={<CloseIcon />}
            {...getCancelButtonProps()}
            aria-label="Cancel"
          />
        </ButtonGroup>
      )
    );
  };

  return (
    <>
      <Heading mb={4}>Rss Feed List: {header.title}</Heading>
      <List spacing={3}>
        {body.outline.map((outline: any, index: number) => (
          <ListItem
            key={index}
            p={2}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
          >
            <Editable
              textAlign="center"
              defaultValue={outline._title}
              fontSize="2xl"
              onSubmit={(value) => {
                updateOpmlGroupTitle(index, value);
              }}
            >
              <EditablePreview />
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
            {renderRssList(outline)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OpmlInfoList;
