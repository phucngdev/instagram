import React from "react";
import { message, Upload } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/config";

export default function UploadImage({ setImageUpload }) {
  const listImageRef = ref(storage, "products/");
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status === "done") {
        const downloadUrl = info.file.response.url;
        setImageUpload(downloadUrl);
        message.success("Tải ảnh thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải ảnh thất bại");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const imageRef = ref(listImageRef, file.name);
        await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(imageRef);
        onSuccess({ url: downloadUrl });
      } catch (error) {
        onError(error);
      }
    },
  };

  return (
    <>
      <Upload {...props} showUploadList={false}>
        <label
          htmlFor="getPhotoComputer"
          className="w-full text-center py-2 px-3 cursor-pointer text-base font-bold text-blue-400"
        >
          Upload Photo
        </label>
      </Upload>
    </>
  );
}
