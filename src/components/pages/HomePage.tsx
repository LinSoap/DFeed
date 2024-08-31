import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useKubo } from "../providers/KuboProvider";
import { catFileFromPath } from "../../utils/kubo";
import { downloadFile, readFileToString } from "../../utils/file";
import { useAlert } from "../providers/AlertProvider";
import { useOpml } from "../providers/OpmlProvider";
import { validateXML } from "../../utils/opml";
import OpmlInfoList from "../common/OpmlInfoList";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const { opml, parseOpml } = useOpml();
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
    console.log(opml);
    setFilePath(res.path);
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
      <OpmlInfoList opml={opml} />
    </>
  );
};

export default HomePage;
