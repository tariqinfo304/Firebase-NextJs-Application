import "../globals.css";
// Router
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";
// Formik & Yup
import { useFormik } from "formik";
import * as Yup from "yup";
// Context
import { useUserAuth } from "../context/userAuthContext";
function Register() {
  const router = useRouter();

  // Context
  //@ts-ignore
  const { register } = useUserAuth();
  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(30, "Cannot be more than 30 characters"),
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Required"),
      password: Yup.string()
        .required("No password provided")
        .min(8, "Password should be 8 chars minimum"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Password does not match")
        .required("Required"),
    }),
    onSubmit: async () => {
      try {
        let res = await register(
          formik.values.name,
          formik.values.email,
          formik.values.password
        );
        return router.push("/");
      } catch (error) {
        console.log("error", error);
        //@ts-ignore
        console.log(error.message);
      }
    },
  });

  return (
    <>
      <Head>
        <meta name="description" content="Resgistration Page" />
        <title>Register</title>
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
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-6 bg-white p-10 rounded-md shadow-md">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formik.values.name}
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
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                {formik.touched.email && formik.errors.email ? (
                  <p className="my-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
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
                {formik.touched.password && formik.errors.password ? (
                  <p className="my-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p className="my-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
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
                Register
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Register;
