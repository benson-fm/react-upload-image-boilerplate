import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import DropZone from "./components/DropZone";

const queryClient = new QueryClient();
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
}

function Component() {
  const [file, setFile] = useState(null);

  const mutation = useMutation(
    (file) => {
      const formData = new FormData();
      formData.append("file", file);

      return fetch(`${serverURL}/api/upload`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (file) => {
    setFile(file);
  };

  const uploadFile = () => {
    if (file) {
      mutation.mutate(file);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-slate-800">
      <h1 className="text-2xl text-white text-center p-10">Upload a file</h1>
      <DropZone onDrop={[handleDrop, handleFileChange]}/>
      <button onClick={uploadFile}>Upload</button>
      {mutation.isLoading && <p>Uploading...</p>}
      {mutation.isError && <p>Error uploading file: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>File uploaded successfully</p>}
    </div>
  );
}
