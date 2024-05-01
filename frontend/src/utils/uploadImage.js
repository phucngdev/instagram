import { message } from "antd";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const upload = async (img, folder) => {
  const fileObj = img.files[0];
  let fileUrl = "";
  if (fileObj) {
    const storageRef = ref(storage, `${folder}/${fileObj.name}`);
    try {
      const snapshort = await uploadBytes(storageRef, fileObj);
      const downloadUrl = await getDownloadURL(snapshort.ref);
      fileUrl = downloadUrl;
    } catch (error) {
      message.error("Ảnh không được để trống");
    }
  } else {
    message.error("Tên hình ảnh không được để trống");
  }
  return fileUrl;
};
