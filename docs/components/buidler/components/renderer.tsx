import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs } from "./tabs";
import SignIn from "./signin";
import { SignUp } from "./signup";
import { TopBar } from "./topbar";
import { useUrl, useComponents } from "@/lib/store/component";
import ForgetPaswordDemo from "./demo/forget-password";
import ResetPasswordDemo from "./demo/reset-password";
export function ComponentRender() {
  const { url, updateUrl } = useUrl();
  const { enabledComp } = useComponents();
  useEffect(() => {
    console.log(enabledComp);
  }, [enabledComp]);
  let comp = <SignInUp />;
  switch (url) {
    case "http://localhost:3000/forget-password":
      comp = <ForgetPaswordDemo />;
      break;

    case "http://localhost:3000/reset-password":
      comp = <ResetPasswordDemo />;
      break;
    default:
      break;
  }
  useEffect(() => {}, [enabledComp]);
  return (
    <div className="relative w-[60%]">
      {/* <TopBar /> */}
      {comp}
    </div>
  );
}

const SignInUp = () => {
  return (
    <div className="flex pt-20 items-center flex-col justify-center w-full md:pb-10">
      <div className="md:w-[400px] ">
        <Tabs
          tabs={[
            {
              title: "Sign In",
              value: "sign-in",
              content: <SignIn />,
            },
            {
              title: "Sign Up",
              value: "sign-up",
              content: <SignUp />,
            },
          ]}
        />
      </div>
    </div>
  );
};
