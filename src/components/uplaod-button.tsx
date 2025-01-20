"use client";

import { UploadButton } from "@/lib/helper";

export default function Upload({onChange}:{onChange:(url:string)=>void}) {
  return (
    <main className="">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
         onChange(res[0]?.url)
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {

          alert(`ERROR! ${error.message}`);
        }}
        onBeforeUploadBegin={(files)=>{
          console.log(files)
          return files
        }}
      />
    </main>
  );
}