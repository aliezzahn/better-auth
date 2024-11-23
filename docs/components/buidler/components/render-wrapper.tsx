import React, { ReactNode, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home,
  Star,
  PlusCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useComponents, useUrl } from "@/lib/store/components";

export function RenderWrapper({ children }: { children: ReactNode }) {
  const { updateUrl, url } = useUrl();
  const { enabledComp, updateEnabledComponent, reset } = useComponents();
  useEffect(() => {
    if (
      enabledComp.additionals.forgetPassword?.routing &&
      enabledComp.additionals.resetPassword?.routing
    ) {
      updateUrl({
        url: "http://localhost:3000/reset-password",
      });
    }
    if (enabledComp.additionals.forgetPassword?.routing) {
      updateUrl({
        url: "http://localhost:3000/forget-password",
      });
    }
  }, [enabledComp]);
  const pathSplitted = url.slice(7, url.length).split("/");

  return <div className="">{children}</div>;
}
