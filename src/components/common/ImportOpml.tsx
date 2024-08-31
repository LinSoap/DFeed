import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { readFileToString, downloadFile } from "../../utils/file";
import { catFileFromPath, isValidCID } from "../../utils/kubo";
import { validateXML } from "../../utils/opml";
import { useAlert } from "../providers/AlertProvider";
import { useState } from "react";
import { useOpml } from "../providers/OpmlProvider";
import { useKubo } from "../providers/KuboProvider";

const ImportOpml = () => {
  const { addAlert } = useAlert();
  const [file, setFile] = useState<File | null>(null);
  const [importIpfsPath, setImportIpfsPath] = useState("");
  const [isFromLocal, setIsFromLocal] = useState(true);
  const [isIpfsValid, setIsIpfsValid] = useState(false);
  const { opml, parseOpml } = useOpml();
  const { kuboClient, opmlIpfsPath, setOpmlIpfsPath } = useKubo();

  const handleImportFromLocal = async () => {
    if (!file) {
      addAlert("Please select a file", "warning");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".opml")) {
      addAlert("Please select a valid OPML file", "warning");
      return;
    }
    const opmlText = await readFileToString(file);
    if (!validateXML(opmlText)) {
      addAlert("Invalid OPML file", "warning");
      return;
    }
    const res = await kuboClient?.add(file);
    await parseOpml(opmlText);
    console.log(opml);
    setOpmlIpfsPath(res.path);
    addAlert("OPML file imported successfully", "success");
  };

  const handleImportFromIpfs = async () => {
    if (isIpfsValid) {
      const res = await catFileFromPath(importIpfsPath, kuboClient);
      const opmlText = new TextDecoder().decode(res);
      await parseOpml(opmlText);
      console.log(opml);
      setOpmlIpfsPath(importIpfsPath);
    } else {
      addAlert("Invalid IPFS path", "warning");
      return;
    }
    addAlert("OPML file imported successfully", "success");
  };

  const handleExport = async () => {
    if (!opmlIpfsPath) {
      addAlert("Please import a file first", "warning");
      return;
    }
    const res = await catFileFromPath(opmlIpfsPath, kuboClient);
    downloadFile(res, "header.opml");
  };

  const handleIpfsPathInput = async (path: string) => {
    setImportIpfsPath(path);
    setIsIpfsValid(isValidCID(path));
  };

  return (
    <div>
      <Button onClick={() => setIsFromLocal(!isFromLocal)}>
        {isFromLocal ? "From IPFS" : "From Local"}
      </Button>
      {isFromLocal ? (
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
      ) : (
        <InputGroup>
          <Input
            value={importIpfsPath}
            onChange={(e) => handleIpfsPathInput(e.target.value)}
          />
          <InputRightElement>
            {isIpfsValid ? (
              <CheckIcon color="green.500" />
            ) : (
              <CloseIcon color="red.500" />
            )}
          </InputRightElement>
        </InputGroup>
      )}
      <p>{opmlIpfsPath}</p>
      <Button
        onClick={isFromLocal ? handleImportFromLocal : handleImportFromIpfs}
      >
        Import
      </Button>
      <Button onClick={handleExport}>Export</Button>
    </div>
  );
};

export default ImportOpml;