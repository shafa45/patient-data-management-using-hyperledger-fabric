import { UploadButton } from 'react-uploader';
import { Uploader } from 'uploader'; // Installed by "react-uploader".

export const Upload: React.FC<{ handleFile: Function }> = ({ handleFile }) => {
  const uploader = Uploader({
    apiKey: 'public_FW25bzsChN9YCkXtpvr3KWD13W8L', // Get production API keys from Bytescale
  });

  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };

  const handleUpload = (files: any) => {
    // handle the uploaded files here
    handleFile(files);
  };

  return (
    <div className='flex flex-col text-black/90 dark:text-white/90 max-w-7xl px-6 mx-auto'>
      <UploadButton
        uploader={uploader}
        options={options}
        onComplete={(files) =>
          // alert(files.map((x) => x.fileUrl).join('\n'))
          handleUpload(files)
        }
      >
        {({ onClick }) => (
          <div className='mx-auto'>
            <button
              className='mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center'
              onClick={onClick}
            >
              Upload report...
            </button>
          </div>
        )}
      </UploadButton>
    </div>
  );
};
