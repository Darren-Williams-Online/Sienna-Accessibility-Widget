import { injectToolCSS } from "../utils/cssGenerator";
import IToolConfig from "../types/IToolConfig";
import { ALL_ELEMENT_SELECTORS, TEXT_SELECTORS } from "../enum/Selectors";

export interface FontOption {
    id: string;
    name: string;
    fontFamily: string;
    css?: string;
}

export const accessibleFonts: FontOption[] = [
    {
        id: "default",
        name: "Default Font",
        fontFamily: "inherit"
    },
    {
        id: "opendyslexic",
        name: "OpenDyslexic",
        fontFamily: "OpenDyslexic3, Arial, sans-serif",
        css: `@font-face {
            font-family: OpenDyslexic3;
            src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"), 
                 url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");
        }`
    },
    {
        id: "comic-sans",
        name: "Comic Sans",
        fontFamily: "'Comic Sans MS', cursive, sans-serif"
    },
    {
        id: "arial",
        name: "Arial",
        fontFamily: "Arial, Helvetica, sans-serif"
    },
    {
        id: "verdana",
        name: "Verdana",
        fontFamily: "Verdana, Geneva, sans-serif"
    },
    {
        id: "tahoma",
        name: "Tahoma",
        fontFamily: "Tahoma, Geneva, sans-serif"
    },
    {
        id: "trebuchet",
        name: "Trebuchet MS",
        fontFamily: "'Trebuchet MS', Helvetica, sans-serif"
    }
];

export function createAccessibleFontConfig(fontOption: FontOption): IToolConfig {
    return {
        id: `accessible-font-${fontOption.id}`,
        selector: `html`,
        childrenSelector: [...ALL_ELEMENT_SELECTORS, ...TEXT_SELECTORS],
        styles: {
            'font-family': fontOption.fontFamily
        },
        css: fontOption.css || ""
    };
}

export default function applyAccessibleFont(fontId: string) {
    // First disable all fonts
    accessibleFonts.forEach(font => {
        const config = createAccessibleFontConfig(font);
        injectToolCSS({
            ...config,
            enable: false
        });
    });

    // Then enable the selected font
    const selectedFont = accessibleFonts.find(font => font.id === fontId);
    if (selectedFont && fontId !== "default") {
        const config = createAccessibleFontConfig(selectedFont);
        injectToolCSS({
            ...config,
            enable: true
        });
    }
}