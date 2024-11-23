import React, { useState } from "react";
import { TabBar } from "./tab-bar";
import { CodeEditor } from "./code-editor";
import { useComponents } from "@/lib/store/components";
import { useCodeComponent } from "@/lib/store/code";
const initialFiles = [
  {
    id: "1",
    name: "auth.ts",
    content: `import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`,
  },
  {
    id: "2",
    name: "client.ts",
    content: `export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}`,
  },
  {
    id: "3",
    name: "signin.ts",
    content: `export interface User {
  id: number;
  name: string;
  email: string;
}

export type Status = 'active' | 'inactive' | 'pending';

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}`,
  },
];

export default function CodeTabs() {
  const { code } = useCodeComponent();
  const { enabledComp } = useComponents();
  const nextCode = [
    {
      id: "1",
      name: "login.tsx",
      content: code.next.components.signin,
    },

    {
      id: "2",
      name: "auth.ts",
      content: code.next.files.auth?.prisma,
    },

    {
      id: "3",
      name: "client.tsx",
      content: code.next.files.client,
    },
  ];
  const [files, setFiles] = useState(nextCode);
  const [activeFileId, setActiveFileId] = useState(files[0].id);
  const handleTabClick = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const handleTabClose = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(files[0].id);
    }
  };

  const activeFile = files.find((file) => file.id === activeFileId);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 border border-border rounded-md overflow-hidden">
      <TabBar
        files={files}
        activeFileId={activeFileId}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
      />
      <div className="bg-background">
        {activeFile && (
          <CodeEditor
            code={activeFile.content}
            activeTab={activeFileId}
            language="typescript"
          />
        )}
      </div>
    </div>
  );
}
