import bigCursorIcon from "../icons/bigCursorIcon.svg"
import stopAnimationsIcon from "../icons/stopAnimationsIcon.svg"
import readingGuideIcon from "../icons/readingGuideIcon.svg"


export default [
    {
        label: 'Accessibility Profiles',
        key: 'accessibility-profiles',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5C14.8 4.1 13.6 3 12.1 3C10.6 3 9.4 4.1 9.2 5.5L3 7V9L9.2 7.5V10.5L3 12V14L9.2 12.5V19H10.8V12.5L17 14V12L10.8 10.5V7.5L17 9H21Z"/></svg>`,
        type: 'select',
        options: [
            { value: 'default', label: 'Default' },
            { value: 'visual-impairment', label: 'Visual Impairment' },
            { value: 'dyslexia', label: 'Dyslexia Friendly' },
            { value: 'motor-impairment', label: 'Motor Impairment' },
            { value: 'cognitive', label: 'Cognitive Support' }
        ]
    },
    {
        label: 'Screen Reader',
        key: 'screen-reader',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 14C9.79 14 8 15.79 8 18S9.79 22 12 22 16 20.21 16 18 14.21 14 12 14M12 9C10.9 9 10 8.1 10 7S10.9 5 12 5 14 5.9 14 7 13.1 9 12 9M21 3H3C1.9 3 1 3.9 1 5V11C1 12.1 1.9 13 3 13H21C22.1 13 23 12.1 23 11V5C23 3.9 22.1 3 21 3Z"/></svg>`,
    },
    {
        label: 'Voice Navigation',
        key: 'voice-navigation',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C13.27 2 14.35 2.95 14.49 4.16L14.5 4.25V11.75C14.5 13.13 13.38 14.25 12 14.25S9.5 13.13 9.5 11.75V4.25C9.5 2.87 10.62 1.75 12 1.75M19 11.75C19 15.31 16.31 18.25 12.75 18.72V21H11.25V18.72C7.69 18.25 5 15.31 5 11.75H6.5C6.5 14.65 8.85 17 11.75 17H12.25C15.15 17 17.5 14.65 17.5 11.75H19Z"/></svg>`,
    },
    {
        label: 'Big Cursor',
        key: 'big-cursor',
        icon: bigCursorIcon,
    },
    {
        label: 'Stop Animations',
        key: 'stop-animations',
        icon: stopAnimationsIcon,
    },
    {
        label: 'Reading Guide',
        key: 'readable-guide',
        icon: readingGuideIcon,
    },
    {
        label: 'Hide Images',
        key: 'hide-images',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9C13.38 9 14.5 8.12 14.5 7S13.38 5 12 5 9.5 5.88 9.5 7 10.62 9 12 9M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2M12 11C8.69 11 6 13.69 6 17V21H18V17C18 13.69 15.31 11 12 11Z"/></svg>`,
    },
]