import { 
    userSettings
} from '@/globals/userSettings';

import stopAnimations from "@/tools/stopAnimations";
import readableFont from "@/tools/readableFont";
import applyAccessibleFont from "@/tools/accessibleFonts";
import bigCursor from "@/tools/bigCursor";
import highlightTitle from "@/tools/highlightTitle";
import readingGuide from "@/tools/readingGuide";
import highlightLinks from "@/tools/highlightLinks";
import adjustLetterSpacing from "@/tools/adjustLetterSpacing";
import adjustLineHeight from "@/tools/adjustLineHeight";
import adjustFontWeight from "@/tools/adjustFontWeight";
import applyAccessibilityProfile from "@/tools/accessibilityProfiles";
import screenReader from "@/tools/screenReader";
import voiceNavigation from "@/tools/voiceNavigation";
import hideImages from "@/tools/hideImages";

export default function renderTools() {
    const states = userSettings?.states;

    highlightTitle(states['highlight-title']);
    highlightLinks(states['highlight-links']);

    adjustLetterSpacing(states['letter-spacing']);
    adjustLineHeight(states['line-height']);
    adjustFontWeight(states['font-weight']);

    // Apply accessible font if selected
    if (states['accessible-font']) {
        applyAccessibleFont(states['accessible-font']);
    } else {
        readableFont(states['readable-font']);
    }

    readingGuide(states['readable-guide']);
    stopAnimations(states['stop-animations']);
    bigCursor(states['big-cursor']);
    
    // Apply accessibility profile if selected
    if (states['accessibility-profiles']) {
        applyAccessibilityProfile(states['accessibility-profiles']);
    }
    
    screenReader(states['screen-reader']);
    voiceNavigation(states['voice-navigation']);
    hideImages(states['hide-images']);
}