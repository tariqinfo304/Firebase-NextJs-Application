import React from "react";
import { useUserAuth } from "../context/userAuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import profileImage from "../../public/Default_pfp.svg.png";

const Profile = () => {
  //@ts-ignore
  const { user, logOut } = useUserAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      //@ts-ignore
      console.log(error.message);
    }
  };

  // Check if the user's email is verified
  const isEmailVerified = user && user.emailVerified;

  return (
    <>
      <Head>
        <meta name="description" content="Profile Page" />
        <title>Profile</title>
      </Head>

      <div className="flex flex-col h-screen w-screen items-center justify-center min-h-screen bg-gray-100">
        <div className="space-y-2 bg-white p-10 rounded-md shadow-md">
          {isEmailVerified ? ( // Only display profile info if email is verified
            <>
              <Image
                className="object-cover rounded-full h-36 w-36 mx-auto m-1 p-1 border-4 border-blue-600"
                src={user.photoURL ? user.photoURL : profileImage}
                width={50}
                height={50}
                alt="Profile avatar"
              />

              <div className="px-6 py-4 space-y-16">
                <div className="flex flex-col">
                  <div className="font-bold text-xl text-center text-gray-800 hover:text-blue-500 hover:cursor-pointer">
                    {user.displayName}
                  </div>
                  <p className="text-gray-600 text-sm text-center">
                    {user.email}
                  </p>
                </div>
                <div className="flex flex-row justify-center font-semibold mx-auto my-4">
                  <button
                    onClick={handleLogout}
                    className="w-48 text-center my-auto text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Display a message when email is not verified
            <div>
              <div className="font-bold text-xl text-center text-gray-800 hover:text-blue-500 hover:cursor-pointer">
                Email not verified, kindly check your email to verify.
              </div>
              <div className="flex flex-row justify-center font-semibold mx-auto mt-8">
                <button
                  onClick={handleLogout}
                  className="w-48 text-center my-auto text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded-3xl py-2 px-4 "
                >
                  Logout
                </button>
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
