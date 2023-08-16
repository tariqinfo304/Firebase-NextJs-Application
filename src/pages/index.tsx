// Router
import { useRouter } from "next/router";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
// Context
import { useUserAuth } from "@/context/userAuthContext";

export default function Login() {
  const router = useRouter();

  // Context
  //@ts-ignore
  const { logIn, logInWithGoogle, logInWithMicrosoft } = useUserAuth();
  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),
    onSubmit: async () => {
      try {
        const user = await logIn(formik.values.email, formik.values.password);
        if (user) {
          console.log("user", user);
          router.push("/profile");
        }
      } catch (error) {
        //@ts-ignore
        console.log(error.message);

        //@ts-ignore
        // Handle different error types and navigate accordingly
        if (error.code === "auth/user-not-found") {
          alert("No such user found..");
        }
        //@ts-ignore
        else if (error.code === "auth/wrong-password") {
          alert("Wrong password entered..");
        }
      }
    },
  });

  return (
    <>
      <Head>
        <meta name="description" content="Login Page" />
        <title>Login</title>
      </Head>
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
            Log in to your account
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-blue-500 hover:text-blue-400"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formik.values.password}
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
                Login
              </button>
            </div>

            <div className="pt-4">
              <div className="flex flex-row items-center text-center text-sm text-black font-normal">
                <hr className="flex-1" />
                <span className="flex-1 w-full py-1 px-4">
                  Or continue with
                </span>
                <hr className="flex-1" />
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  type="button"
                  onClick={async () => {
                    const googleUser = await logInWithGoogle();
                    if (googleUser) {
                      router.push("/profile");
                    }
                  }}
                  className="flex-1 justify-center items-center px-4 py-2 text-sm border flex gap-2 border-slate-200 rounded-md text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                >
                  <Image
                    width={50}
                    height={50}
                    className="w-4 h-4"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Google</span>
                </button>

                {/* Microsoft button */}
                <button
                  type="button"
                  onClick={async () => {
                    const microsoftUser = await logInWithMicrosoft();
                    if (microsoftUser) {
                      router.push("/profile");
                    }
                  }}
                  className="flex-1 justify-center items-center px-4 py-2 text-sm border flex gap-2 border-slate-200 rounded-md text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                >
                  <Image
                    width={50}
                    height={50}
                    className="w-4 h-4"
                    src="https://learn.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.svg"
                    loading="lazy"
                    alt="microsoft logo"
                  />
                  <span>Microsoft</span>
                </button>
              </div>
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
    </>
  );
}
