import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
import { toast } from "sonner";
import Sidebar from "../../components/Sidebar";
import { selectLoggedInUser } from "../../reducers/auth/authReducer";
 

const UserProfile: React.FC = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
//   const dispatch = useDispatch();
//   const { configWithJWT } = useConfig();
  useEffect(() => {
    if (loggedInUser?.name) {
      setName(loggedInUser.name);
    }
    if (loggedInUser?.email) {
      setEmail(loggedInUser.email);
    }
  }, [loggedInUser]);
  const handleEditClick = () => {
    setEdit((prev) => !prev);
  };

  const handleSaveClick = async () => {
     
  };

  return (
    <div className="flex w-full pr-2 h-screen">
      <Sidebar />
      <main className="flex-1 ml-4 lg:ml-[17rem] pr-2 z-10">
        <section className="p-4 bg-white shadow-lg rounded-lg w-full border border-gray-500 mt-7">
          <h1 className="text-center font-semibold text-xl text-gray-700 mb-5">
            Personal Details
          </h1>
          <div className="container flex flex-col gap-4">
            <div className="flex items-center">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="font-medium text-gray-600">
                  Name
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full p-3 focus:outline-none border rounded-md ${
                      edit ? "border-blue-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 bg-gray-100`}
                    // disabled={!edit}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="font-medium text-gray-600">
                  Email
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 focus:outline-none border rounded-md ${
                      edit ? "border-blue-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 bg-gray-100`}
                    // disabled={!edit}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
                onClick={() => (edit ? handleSaveClick() : handleEditClick())}
              >
                {edit ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
