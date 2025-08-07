import {
    ICON_SELECTOR
} from '@/enum/Selectors';

const FONT_SIZE_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.asw-text,button,input,textarea,select,label';
const ICON_SELECTOR_SET = new Set(ICON_SELECTOR);

export default function adjustFontSize(multiply:number = 1) {
    document
        .querySelectorAll(FONT_SIZE_SELECTOR)
        .forEach((el: HTMLElement) => {
            // Skip elements that contain any class in ICON_SELECTOR_SET
            if ([...el.classList].some(cls => ICON_SELECTOR_SET.has(cls))) {
                return;
            }

            const computedStyle = window.getComputedStyle(el);
            
            // Handle font size
            let orgFontSize = Number(el.dataset.aswOrgFontSize) || parseInt(computedStyle.fontSize);
            if (!el.dataset.aswOrgFontSize) {
                el.dataset.aswOrgFontSize = String(orgFontSize);
            }
            const newFontSize = orgFontSize * multiply;
            el.style.fontSize = `${newFontSize}px`;
            
            // Handle line height
            if (!el.dataset.aswOrgLineHeight) {
                const lineHeightValue = computedStyle.lineHeight;
                if (lineHeightValue === 'normal' || isNaN(parseInt(lineHeightValue))) {
                    el.dataset.aswOrgLineHeight = String(orgFontSize * 1.4);
                } else {
                    el.dataset.aswOrgLineHeight = String(parseInt(lineHeightValue));
                }
            }
            const orgLineHeight = Number(el.dataset.aswOrgLineHeight);
            const newLineHeight = orgLineHeight * multiply;
            el.style.lineHeight = `${newLineHeight}px`;
            
            // Handle padding and margins for buttons and form elements
            if (el.tagName === 'BUTTON' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                // Handle padding
                ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].forEach(prop => {
                    const dataKey = `aswOrg${prop.charAt(0).toUpperCase() + prop.slice(1)}`;
                    let orgValue = Number(el.dataset[dataKey]) || parseInt(computedStyle[prop as any]) || 8;
                    if (!el.dataset[dataKey]) {
                        el.dataset[dataKey] = String(orgValue);
                    }
                    const newValue = orgValue * multiply;
                    (el.style as any)[prop] = `${newValue}px`;
                });
                
                // Handle margins
                ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'].forEach(prop => {
                    const dataKey = `aswOrg${prop.charAt(0).toUpperCase() + prop.slice(1)}`;
                    let orgValue = Number(el.dataset[dataKey]) || parseInt(computedStyle[prop as any]) || 0;
                    if (!el.dataset[dataKey]) {
                        el.dataset[dataKey] = String(orgValue);
                    }
                    const newValue = orgValue * multiply;
                    (el.style as any)[prop] = `${newValue}px`;
                });
            }
        });
}