"use client";

import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [formValues, setFormValues] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginSchema = Yup.object().shape({
    userName: Yup.string()
      .trim()
      .required("Required")
      .matches(
        /^'?(?:\p{L}\p{M}*)+(?:['\s](?:\p{L}\p{M}*)+)*'?$/u,
        "Only normal characters are allowed in user name."
      ),
    password: Yup.string()
      .required("Required")
      .min(6, "must be at least 6 characters long."),
  });
  return (
    <div className="h-screen bg-[#262E35] flex bg-cover bg-no-repeat bg-[url(/images/login-bg-shapes.svg)] bg-left lg:bg-center">
      <div className="flex items-center justify-center absolute lg:grid lg:grid-cols-2 lg:gap-x-10 w-full h-screen ">
        <div></div>

        <div className="border-2 rounded-[17px] sm:h-fit md:h-[30rem] lg:h-fit md:p-4 bg-[#FCF7F8] w-5/6 md:w-3/5 lg:w-2/3 xl:w-3/6 place-self-center ">
          <p className="text-center text-3xl pt-6 pb-6 text-[#262E35] ">
            Login
          </p>
          <p className="text-[#787E83] text-center text-sm py-4">
            Welcome back please login to your account
          </p>
          <div className="mx-4">
            <Formik
              enableReinitialize={true}
              initialValues={formValues}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                console.log("values", values);
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <div className="grid">
                    <label className="text-[#787E83] pt-2" htmlFor="UserName">
                      User Name
                    </label>

                    <Field
                      className="border-[1px] border-[#DDD4D4] px-2 py-1 mt-1 mb-2 rounded w-full hover:border-[#5D636A] hover:border-1 focus:ring-0 outline-none"
                      id="UserName"
                      name="UserName"
                      onChange={(e: any) =>
                        setFormValues({
                          userName: e.target.value,
                          password: props.values.password,
                        })
                      }
                      value={props.values.userName}
                    />

                    {props.errors.userName && props.touched.userName ? (
                      <div className="text-[#E95959] py-[1px] px-2 my-1 text-sm">
                        {props.errors.userName}
                      </div>
                    ) : null}

                    <label className="text-[#787E83] pt-2" htmlFor="Password">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        className="border-[1px] border-[#DDD4D4] px-2 py-1 my-2 rounded w-full hover:border-[#5D636A] hover:border-1 focus:ring-0 outline-none"
                        id="Password"
                        name="Password"
                        onChange={(e: any) =>
                          setFormValues({
                            userName: props.values.userName,
                            password: e.target.value,
                          })
                        }
                        type={showPassword ? "text" : "password"}
                        value={props.values.password}
                      />
                      {showPassword ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="absolute w-5 top-[17px] right-[7px] cursor-pointer"
                          color="#BBC0C3"
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="absolute w-5 top-[17px] right-[7px] cursor-pointer"
                          color="#BBC0C3"
                          onClick={() => {
                            setShowPassword(true);
                          }}
                        />
                      )}
                    </div>

                    {props.errors.password && props.touched.password ? (
                      <div className="text-[#E95959] py-[1px] px-2 my-1 text-sm">
                        {props.errors.password}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      className="text-[#ffffff] bg-[#7083FF] py-1 rounded my-3 md:my-6"
                    >
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <p className="text-[#787E83] text-center text-sm py-2 border-t mt-2 mx-6 border-[#BBC0C3]">
              New User ?{" "}
              <a href="#" className="text-[#407BFF]">
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
