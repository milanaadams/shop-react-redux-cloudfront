import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [authError, setAuthError] = React.useState<string>("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    const authorizationToken = localStorage.getItem("authorization_token");

    // Get the presigned URL
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: authorizationToken
            ? `Basic ${authorizationToken}`
            : "",
        },
        url,
        params: {
          name: encodeURIComponent(file?.name as string),
        },
      });
      console.log("Resonse: ", response.data);
      console.log("File to upload: ", file?.name);
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });
      console.log("Result: ", result);
      setAuthError("");
      setFile(undefined);
    } catch (err: any) {
      console.log("Authorization error: ", err.response.status);
      const message = `Authorization error: ${err.response.data.message}`;
      setAuthError(message);
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {authError && <div>{authError}</div>}
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
