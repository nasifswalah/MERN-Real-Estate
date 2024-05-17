import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice.js";



export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [ updateSuccess, setUpdateSuccess ] = useState(false);
  const dispatch = useDispatch();
  

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      };
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

  };

  const handleDelete = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
        },
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      } 
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-2">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full object-cover h-24 w-24 cursor-pointer self-center mt-7"
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile image"
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
          defaultValue={currentUser.username}
          onChange={handleChange}
          id="username"
        />
        <input
          className="p-3 rounded-lg border"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
        />
        <input
          className="p-3 rounded-lg border"
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
        />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg border text-white">
          {loading ? "Updating.." : 'Update'}
        </button>
        <div className="mt-2 flex justify-between">
          <span className="text-red-700  text-sm" onClick={handleDelete}>Delete account</span>
          <span className="text-red-700 text-sm" onClick={handleSignOut}>Sign out</span>
        </div>
        <p className="text-red-700 mt-2 text-sm">
          {error ? error : ''}</p>
        <p className="text-green-700 mt-2 text-sm">
          {updateSuccess ? 'Profile updated succesfully' : ''}</p>
      </form>
    </div>
  );
}
