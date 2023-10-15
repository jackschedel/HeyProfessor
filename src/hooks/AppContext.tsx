import React, { createContext, useContext, useState } from "react";
import { ContextDocument, DocumentType } from "@src/types";

interface AppContext {
  chatArray: string[];
  appendChatArray: (str: string) => void;
  replaceLastChat: (str: string) => void;
  contextDocument: ContextDocument | null;
  setContextDocument: (doc: ContextDocument) => void;
  fetchedCanvasData: any | null;
  setFetchedCanvasData: (data: any) => void;
  docText: string;
  setDocText: (str: string) => void;
}

const AppContext = createContext<AppContext | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chatArray, setChatArray] = useState<string[]>([]);
  const [contextDocument, setContextDocument] =
    useState<ContextDocument | null>(null);
  const [fetchedCanvasData, setFetchedCanvasData] = useState<any | null>(null);
  const [docText, setDocText] = useState<string>("Why learn data analytics and machine learning? Businesses today often use data to solve complex problems. A business that ignores the data it generates is at a significant disadvantage.");

  const appendChatArray = (str: string) => {
    setChatArray((prevArray) => [...prevArray, str]);
  };

  const replaceLastChat = (str: string) => {
    setChatArray((prevArray) => {
      let newArray = [...prevArray];
      newArray[newArray.length - 1] = str;
      return newArray;
    });
  };

  return (
    <AppContext.Provider
      value={{
        chatArray,
        appendChatArray,
        replaceLastChat,
        contextDocument,
        setContextDocument,
        fetchedCanvasData,
        setFetchedCanvasData,
        docText,
        setDocText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
