import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useState } from "react";
import { Highlight, HighlightProps, themes } from "prism-react-renderer";
import theme from "./theme";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { replaceCommentsWithJSX } from "@/lib/parser";
import { useComponents } from "@/lib/store/components";
import { useCodeComponent } from "@/lib/store/code";
import { commentMap } from "@/lib/constant/contentMap";
import { Button } from "@/components/ui/button";
interface CodeEditorProps {
  code: string;
  language: string;
  activeTab: string;
}

export function CodeEditor({ code, language, activeTab }: CodeEditorProps) {
  const [copiedStates, setCopiedStates] = useState(false);

  const { code: codeD } = useCodeComponent();
  const [dbOptions, setDbOptions] = useState("prisma");
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(true);
      setTimeout(() => {
        setCopiedStates(false);
      }, 2000);
    });
  };
  const { enabledComp } = useComponents();
  const parsedContent = (content: string) => {
    let listsOfComments = Object.entries(enabledComp.additionals)
      .filter(([comment, enabled]) => enabled.visiblity)
      .map((curr) => curr[0]);
    let socialEnabledLists = Object.entries(enabledComp.socials)
      .filter(([comment, enabled]) => enabled)
      .map((curr) => curr[0]);
    socialEnabledLists = socialEnabledLists.length
      ? ["socialProviders"].concat(socialEnabledLists)
      : socialEnabledLists;
    const otherEnabledLists = Object.entries(enabledComp.plugins)
      .filter(([comment, enabled]) => enabled)
      .map((curr) => curr[0]);
    console.log({ otherEnabledLists });
    listsOfComments = [
      "empty",
      ...listsOfComments,
      ...socialEnabledLists,
      ...otherEnabledLists,
    ];
    let cleanedJsx = "";
    const replacableLists = Object.keys(commentMap);
    if (listsOfComments.length === 1) {
      cleanedJsx = replaceCommentsWithJSX(replacableLists, content, {
        eraseAll: true,
      });
    } else {
      cleanedJsx = replaceCommentsWithJSX(listsOfComments, content, {
        eraseAll: false,
      });
      cleanedJsx = replaceCommentsWithJSX(replacableLists, cleanedJsx, {
        eraseAll: true,
      });

      console.log({ cleanedJsx });
    }
    return cleanedJsx;
  };

  const result = parsedContent(code);
  const [codeCopy, setCodeCopy] = useState(result);
  // handle language change here with switch case.
  return (
    <Highlight theme={theme} code={codeCopy} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            position: "relative",
            padding: "1rem",
            overflow: "auto",
            maxHeight: "400px",
          }}
        >
          <div className="absolute top-2 right-1">
            {activeTab === "2" && (
              <div className="relative">
                <div className="z-20 absolute top-2 right-14">
                  <Select
                    onValueChange={(e) => {
                      setDbOptions(e);

                      setCodeCopy(parsedContent(codeD.next.files.auth[`${e}`]));
                      console.log({ e });
                    }}
                    defaultValue={dbOptions}
                  >
                    <SelectTrigger className="w-[180px] text-xs h-7 rounded-none">
                      <SelectValue placeholder="Select a adapter" />
                    </SelectTrigger>
                    <SelectContent className="text-xs rounded-none">
                      <SelectGroup>
                        <SelectLabel>Adapter</SelectLabel>

                        <hr className="mb-2 w-full h-[1.5px] bg-gray-700/20" />

                        <SelectItem
                          className="text-xs rounded-none"
                          value="prisma"
                        >
                          Prisma
                        </SelectItem>
                        <SelectItem
                          className="text-xs rounded-none"
                          value="drizzle"
                        >
                          Drizzle
                        </SelectItem>

                        <SelectLabel>Database</SelectLabel>
                        <hr className="mb-2 w-full h-[1.5px] bg-gray-200" />

                        <SelectItem
                          className="text-xs rounded-none"
                          value="mongoDb"
                        >
                          MongoDB
                        </SelectItem>
                        <SelectItem
                          className="text-xs rounded-none"
                          value="mysql"
                        >
                          MySql
                        </SelectItem>
                        <SelectItem
                          className="text-xs rounded-none"
                          value="postgres"
                        >
                          Postgres
                        </SelectItem>
                        <SelectItem
                          className="text-xs rounded-none"
                          value="libsql"
                        >
                          Libsql
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="icon"
              className="absolute rounded-none outline-none w-7 h-7 bg-transparent top-2 right-4"
              onClick={() => copyToClipboard(code)}
            >
              {copiedStates ? (
                <CheckIcon className="h-3 w-3" />
              ) : (
                <CopyIcon className="h-3 w-3" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <span className="mr-4 text-gray-500">{i + 1}</span>
              {line.map((token, key) => (
                <span
                  key={key}
                  {...getTokenProps({ token, key, className: "text-sm" })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
