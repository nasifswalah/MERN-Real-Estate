import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePerc);
  console.log(formData);

  useEffect(
    () => {
      if (file) {
        handleFileUpload(file);
      }
    },
    [file]
  );

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-2">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full object-cover h-24 w-24 cursor-pointer self-center mt-7"
          src={formData.avatar || currentUser.avatar}
          alt="Profile image"
          onClick={() => fileRef.current.click()}
        />
        <p  className="text-sm self-center">
          {
            filePerc > 0 && filePerc < 100 ? 
            (<span className="text-slate-700 ">{`Uploading ${filePerc}%`}</span>)
            : fileUploadError ? (
              <span className="text-red-700">Image upload error</span>
            )
            : filePerc === 100 ? (
              <span className="text-green-700">Image uploaded successfully</span>
            )
            : 
            ""
          }
        </p>
        <input
          className="p-3 rounded-lg border"
          type="text"
          placeholder="username"
          id="username"
        />
        <input
          className="p-3 rounded-lg border"
          type="email"
          placeholder="email"
          id="email"
        />
        <input
          className="p-3 rounded-lg border"
          type="password"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 p-3 rounded-lg border text-white">
          Update
        </button>
        <div className="mt-2 flex justify-between">
          <span className="text-red-700  text-sm">Delete account</span>
          <span className="text-red-700 text-sm">Sign out</span>
        </div>
      </form>
    </div>
  );
}
