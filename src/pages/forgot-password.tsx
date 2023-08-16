import "../globals.css";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../utils/firebase.config";

function ForgotPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
    }),
    onSubmit: async () => {
      try {
        await sendPasswordResetEmail(auth, formik.values.email);
        router.push("/");
      } catch (error) {
        alert("Email not fond!");
        //@ts-ignore
        console.log(error.message);
      }
    },
  });

  return (
    <html>
      <Head>
        <title>Learn Anything</title>
      </Head>
      <body>
        <form
          className="flex min-h-full h-screen w-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-gray-100"
          onSubmit={formik.handleSubmit}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-20 w-auto"
              src="https://www.svgrepo.com/show/529279/user-circle.svg"
              alt="user profile logo"
              width={80}
              height={80}
            />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password?
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="space-y-6 bg-white p-10 rounded-md shadow-md">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Reset Password
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </body>
    </html>
  );
}

export default ForgotPassword;
