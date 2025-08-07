import { userSettings, saveUserSettings } from "@/globals/userSettings";
import renderTools from "@/views/menu/renderTools";
import adjustFontSize from "./adjustFontSize";
import enableContrast from "./enableContrast";

export interface AccessibilityProfile {
    id: string;
    name: string;
    settings: {
        fontSize?: number;
        contrast?: string;
        'big-cursor'?: boolean;
        'stop-animations'?: boolean;
        'readable-guide'?: boolean;
        'accessible-font'?: string;
        'highlight-links'?: boolean;
        'line-height'?: boolean;
        'letter-spacing'?: boolean;
    };
}

export const accessibilityProfiles: AccessibilityProfile[] = [
    {
        id: "default",
        name: "Default",
        settings: {}
    },
    {
        id: "visual-impairment",
        name: "Visual Impairment",
        settings: {
            fontSize: 1.4,
            contrast: "high-contrast",
            'big-cursor': true,
            'accessible-font': 'arial',
            'highlight-links': true
        }
    },
    {
        id: "dyslexia",
        name: "Dyslexia Friendly",
        settings: {
            fontSize: 1.2,
            'accessible-font': 'opendyslexic',
            'line-height': true,
            'letter-spacing': true,
            'stop-animations': true
        }
    },
    {
        id: "motor-impairment",
        name: "Motor Impairment",
        settings: {
            fontSize: 1.3,
            'big-cursor': true,
            'stop-animations': true,
            'highlight-links': true
        }
    },
    {
        id: "cognitive",
        name: "Cognitive Support",
        settings: {
            fontSize: 1.2,
            'stop-animations': true,
            'readable-guide': true,
            'accessible-font': 'verdana'
        }
    }
];

export default function applyAccessibilityProfile(profileId: string) {
    const profile = accessibilityProfiles.find(p => p.id === profileId);
    
    if (!profile) return;

    // Reset current settings
    userSettings.states = {
        fontSize: 1,
        contrast: false
    };

    // Apply profile settings
    Object.assign(userSettings.states, profile.settings);

    // Apply the changes
    adjustFontSize(userSettings.states.fontSize || 1);
    enableContrast(userSettings.states.contrast);
    renderTools();

    saveUserSettings();
}