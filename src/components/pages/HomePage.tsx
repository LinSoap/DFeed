import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useKubo } from "../providers/KuboProvider";
import { catFileFromPath, Uint8ArrayToText } from "../../utils/kubo";
import { downloadFile } from "../../utils/download";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const { kuboClient } = useKubo();
  console.log(file);

  const handleImport = async () => {
    console.log(kuboClient);
    if (!file) return;
    const res = await kuboClient?.add(file);
    setFilePath(res.path);
    console.log(res);
  };

  const handleExport = async () => {
    if (!filePath) return;
    const res = await catFileFromPath(filePath, kuboClient);
    const text = Uint8ArrayToText(res);
    console.log(text);
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
    </>
  );
};

export default HomePage;
