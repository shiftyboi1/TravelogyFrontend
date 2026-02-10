import React, { createContext, useContext, useEffect, useState } from "react";

const languages: { [key: string]: any } = {
  "en-us": require("@/lang/en-us.json"),
};

// Define the shape of the context
type LanguageContextType = {
    currentLanguage: string;
    loadedLanguage: { [key: string]: string };
    setLanguage: (lang: string) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({children}: {children: React.ReactNode}) {
    const [currentLanguage, setCurrentLanguage] = useState("en-us");
    const [loadedLanguage, setLoadedLanguage] = useState<{ [key: string]: string }>(languages["en-us"].values);

    useEffect(() => {
        const languageFile = languages[currentLanguage];
        if (languageFile) {
            setLoadedLanguage(languageFile.values);
        }
    }, [currentLanguage]);

    const t = (key: string) => {
        return loadedLanguage[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, loadedLanguage, setLanguage: setCurrentLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook to use the language context
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

