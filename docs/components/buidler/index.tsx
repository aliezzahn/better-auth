import {
  Code,
  Layout,
  LayoutDashboard,
  Mail,
  PhoneCall,
  PlusIcon,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { AuthBuilder } from "./components/auth-builder";
export function Builder() {
  const enabledComp = {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-stone-950 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-sm p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-sm">
            <span className="absolute inset-0 rounded-sm bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-none bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <PlusIcon size={14} />
            <span>Create Sign in Box</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-stone-800/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:rounded-none max-w-7xl">
        <DialogHeader>
          <DialogTitle>Create Sign in Box</DialogTitle>
          <DialogDescription>
            Configure the sign in box to your liking and copy the code to your
            application
          </DialogDescription>
        </DialogHeader>
        <AuthBuilder />
      </DialogContent>
    </Dialog>
  );
}
