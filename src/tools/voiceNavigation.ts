let recognition: SpeechRecognition | null = null;
let isListening = false;

interface VoiceCommand {
    patterns: string[];
    action: () => void;
    description: string;
}

const voiceCommands: VoiceCommand[] = [
    {
        patterns: ['click', 'press', 'activate'],
        action: () => clickFocusedElement(),
        description: 'Click the focused element'
    },
    {
        patterns: ['next', 'tab', 'forward'],
        action: () => focusNext(),
        description: 'Move to next focusable element'
    },
    {
        patterns: ['previous', 'back', 'shift tab'],
        action: () => focusPrevious(),
        description: 'Move to previous focusable element'
    },
    {
        patterns: ['scroll up', 'page up'],
        action: () => window.scrollBy(0, -300),
        description: 'Scroll up'
    },
    {
        patterns: ['scroll down', 'page down'],
        action: () => window.scrollBy(0, 300),
        description: 'Scroll down'
    },
    {
        patterns: ['go to top', 'top of page'],
        action: () => window.scrollTo(0, 0),
        description: 'Go to top of page'
    },
    {
        patterns: ['go to bottom', 'bottom of page'],
        action: () => window.scrollTo(0, document.body.scrollHeight),
        description: 'Go to bottom of page'
    },
    {
        patterns: ['find links', 'show links'],
        action: () => highlightLinks(),
        description: 'Highlight all links on page'
    },
    {
        patterns: ['find buttons', 'show buttons'],
        action: () => highlightButtons(),
        description: 'Highlight all buttons on page'
    },
    {
        patterns: ['stop listening', 'voice off'],
        action: () => stopVoiceNavigation(),
        description: 'Stop voice navigation'
    }
];

export default function voiceNavigation(enable = false) {
    if (enable) {
        startVoiceNavigation();
    } else {
        stopVoiceNavigation();
    }
}

function startVoiceNavigation() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice navigation is not supported in this browser');
        return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isListening = true;
        showVoiceIndicator();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
    };

    recognition.onend = () => {
        if (isListening) {
            recognition?.start(); // Restart if still enabled
        }
    };

    recognition.start();
}

function stopVoiceNavigation() {
    isListening = false;
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    hideVoiceIndicator();
    clearHighlights();
}

function processVoiceCommand(transcript: string) {
    for (const command of voiceCommands) {
        for (const pattern of command.patterns) {
            if (transcript.includes(pattern)) {
                command.action();
                return;
            }
        }
    }
    
    // Try to find element by text content
    const elements = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
    const matchingElement = elements.find(el => 
        el.textContent?.toLowerCase().includes(transcript) ||
        (el as HTMLInputElement).placeholder?.toLowerCase().includes(transcript)
    );
    
    if (matchingElement) {
        (matchingElement as HTMLElement).focus();
        (matchingElement as HTMLElement).click();
    }
}

function clickFocusedElement() {
    const focused = document.activeElement as HTMLElement;
    if (focused && focused !== document.body) {
        focused.click();
    }
}

function focusNext() {
    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    focusableElements[nextIndex]?.focus();
}

function focusPrevious() {
    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
    focusableElements[prevIndex]?.focus();
}

function getFocusableElements(): HTMLElement[] {
    return Array.from(document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];
}

function highlightLinks() {
    clearHighlights();
    document.querySelectorAll('a').forEach((link, index) => {
        const badge = document.createElement('span');
        badge.textContent = (index + 1).toString();
        badge.className = 'asw-voice-badge';
        badge.style.cssText = 'position:absolute;background:#007cba;color:white;padding:2px 6px;border-radius:3px;font-size:12px;z-index:999999;';
        
        const rect = link.getBoundingClientRect();
        badge.style.top = (rect.top + window.scrollY - 20) + 'px';
        badge.style.left = (rect.left + window.scrollX) + 'px';
        
        document.body.appendChild(badge);
    });
}

function highlightButtons() {
    clearHighlights();
    document.querySelectorAll('button').forEach((button, index) => {
        const badge = document.createElement('span');
        badge.textContent = (index + 1).toString();
        badge.className = 'asw-voice-badge';
        badge.style.cssText = 'position:absolute;background:#28a745;color:white;padding:2px 6px;border-radius:3px;font-size:12px;z-index:999999;';
        
        const rect = button.getBoundingClientRect();
        badge.style.top = (rect.top + window.scrollY - 20) + 'px';
        badge.style.left = (rect.left + window.scrollX) + 'px';
        
        document.body.appendChild(badge);
    });
}

function clearHighlights() {
    document.querySelectorAll('.asw-voice-badge').forEach(badge => badge.remove());
}

function showVoiceIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'asw-voice-indicator';
    indicator.innerHTML = '🎤 Listening...';
    indicator.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#007cba;color:white;padding:10px 20px;border-radius:25px;z-index:999999;font-size:14px;';
    document.body.appendChild(indicator);
}

function hideVoiceIndicator() {
    document.getElementById('asw-voice-indicator')?.remove();
}