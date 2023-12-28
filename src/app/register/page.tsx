"use client";

import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [formValues, setFormValues] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerSchema = Yup.object().shape({
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
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  return (
    <div className="h-screen bg-[#262E35] flex bg-cover bg-no-repeat bg-[url(/images/login-bg-shapes.svg)] bg-left lg:bg-center">
      <div className="flex items-center justify-center absolute lg:grid lg:grid-cols-2 w-full h-screen ">
        <div></div>

        <div className="border-2 rounded-[17px] h-fit md:p-4 bg-[#FCF7F8] w-5/6 md:w-3/5 lg:w-2/3 xl:w-4/6 xl:max-w-[30rem] place-self-center ">
          <p className="text-center text-3xl pt-6 pb-4 text-[#262E35] border-b mb-4">
            Register
          </p>

          <div className="mx-4 md:mx-6 lg:mx-2">
            <Formik
              enableReinitialize={true}
              initialValues={formValues}
              validationSchema={registerSchema}
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
                      className="border-[1px] border-[#DDD4D4] px-2 py-1 mt-1 rounded w-full hover:border-[#5D636A] hover:border-1 focus:ring-0 outline-none"
                      id="UserName"
                      name="UserName"
                      onChange={(e: any) =>
                        setFormValues({
                          userName: e.target.value,
                          password: props.values.password,
                          confirmPassword: props.values.confirmPassword,
                        })
                      }
                      value={props.values.userName}
                    />

                    {props.errors.userName && props.touched.userName ? (
                      <div className="text-[#E95959] py-[1px] px-2 my-1 rounded text-sm">
                        {props.errors.userName}
                      </div>
                    ) : null}

                    <label className="text-[#787E83] py-2" htmlFor="Password">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        className="border-[1px] border-[#DDD4D4] px-2 pt-2 mt-1 rounded w-full hover:border-[#5D636A] hover:border-1 focus:ring-0 outline-none"
                        id="Password"
                        name="Password"
                        onChange={(e: any) =>
                          setFormValues({
                            userName: props.values.userName,
                            password: e.target.value,
                            confirmPassword: props.values.confirmPassword,
                          })
                        }
                        type={showPassword ? "text" : "password"}
                        value={props.values.password}
                      />
                      {showPassword ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="absolute w-5 top-[14px] right-[8px] cursor-pointer"
                          color="#BBC0C3"
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="absolute w-5 top-[14px] right-[8px] cursor-pointer"
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

                    <label
                      className="text-[#787E83] py-2"
                      htmlFor="ConfirmPassword"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Field
                        className="border-[1px] border-[#DDD4D4] px-2 pt-2 mt-1 rounded w-full hover:border-[#5D636A] hover:border-1 focus:ring-0 outline-none"
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        onChange={(e: any) =>
                          setFormValues({
                            userName: props.values.userName,
                            password: props.values.password,
                            confirmPassword: e.target.value,
                          })
                        }
                        type={showConfirmPassword ? "text" : "password"}
                        value={props.values.confirmPassword}
                      />
                      {showConfirmPassword ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="absolute w-5 top-[14px] right-[8px] cursor-pointer"
                          color="#BBC0C3"
                          onClick={() => {
                            setShowConfirmPassword(false);
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="absolute w-5 top-[14px] right-[8px] cursor-pointer"
                          color="#BBC0C3"
                          onClick={() => {
                            setShowConfirmPassword(true);
                          }}
                        />
                      )}
                    </div>

                    {props.errors.confirmPassword &&
                    props.touched.confirmPassword ? (
                      <div className="text-[#E95959] py-[1px] px-2 my-1 text-sm">
                        {props.errors.confirmPassword}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      className="text-[#ffffff] bg-[#7083FF] py-1 rounded my-4 md:my-6"
                    >
                      Register
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <p className="text-[#787E83] text-center text-sm py-2 border-t mt-2 mx-6 border-[#BBC0C3]">
              Already have an account ?{" "}
              <a href="#" className="text-[#407BFF]">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
