import React, { useEffect, useState } from 'react';
import * as Bytescale from '@bytescale/sdk';
import nodeFetch from 'node-fetch';

interface FileSummary {
  filePath: string;
  fileName: string;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<FileSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const folderApi = new Bytescale.FolderApi({
  //     fetchApi: nodeFetch as any,
  //     apiKey: "secret_FW25bzsDorCPzsNqYSWPYLByej8R", // Replace with your actual API key
  //   });

  //   folderApi.listFolder({
  //     accountId: "FW25bzs", // Replace with your actual account ID
  //     folderPath: "/", // Specify the folder path you want to list files from
  //   })
  //   .then(result => {
  //     // const fileSummaries = result.items.map(item => ({
  //     //   filePath: item.path,
  //     //   fileName: item.name,
  //     // }));
  //     // setFiles(fileSummaries);
  //     // setLoading(false);
  //     console.log(result)
  //   })
  //   .catch(error => {
  //     console.error("Failed to list files:", error);
  //     setLoading(false);
  //   });
  // }, []);

  if (loading) {
    return <div>Loading files...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Files</h2>
      <ul className="list-disc pl-5">
        {files.map((file, index) => (
          <li key={index} className="mb-2">
            {file.fileName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;