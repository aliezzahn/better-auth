import { useEffect } from "react";
import { useComponents, useUrl } from "@/lib/store/components";
import { useHistory } from "@/lib/store/history";
import ResetPasswordDemo from "./components/demo/reset-password";
import ForgetPaswordDemo from "./components/demo/forget-password";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { AuthTabs } from "./tabs";
import { RenderWrapper } from "./components/render-wrapper";
export const RenderedComponent = () => {
  const { updateUrl, url } = useUrl();
  const { enabledComp, updateEnabledComponent, reset } = useComponents();
  useEffect(() => {
    console.log({ enabledComp, url });
  }, [enabledComp, url]);
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
  return <RenderWrapper>{comp}</RenderWrapper>;
};
const SignInUp = () => {
  return (
    <AuthTabs
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
  );
};
