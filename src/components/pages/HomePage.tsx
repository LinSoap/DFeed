import { Button, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useKubo } from "../providers/KuboProvider";
import { catFileFromPath } from "../../utils/kubo";
import { downloadFile, readFileToString } from "../../utils/file";
import { useAlert } from "../providers/AlertProvider";
import { useOpml } from "../providers/OpmlProvider";
import { validateXML } from "../../utils/opml";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const { parseOpml } = useOpml();
  const [editOpml, setEditOpml] = useState<string | null>(null);
  const { kuboClient } = useKubo();
  const { addAlert } = useAlert();

  const handleImport = async () => {
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
    setFilePath(res.path);
    setEditOpml(opmlText);
    addAlert("OPML file imported successfully", "success");
  };

  const handleExport = async () => {
    if (!filePath) {
      addAlert("Please import a file first", "warning");
      return;
    }
    const res = await catFileFromPath(filePath, kuboClient);
    downloadFile(res, "header.opml");
  };

  return (
    <>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <p>{filePath}</p>
      <Button onClick={handleImport}>Import</Button>
      <Button onClick={handleExport}>Export</Button>
      {editOpml && (
        <Textarea
          placeholder="Here is a sample placeholder"
          value={editOpml}
          onChange={(e) => setEditOpml(e.target.value)}
        />
      )}
    </>
  );
};

export default HomePage;
