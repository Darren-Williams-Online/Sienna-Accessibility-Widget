const elementNodeNames: string[] = ["B", "STRONG", "I", "U", "EM", "MARK", "SUB", "SUP", "INS", "PRE", "ABBR"];

function getTextFromNode(node) {

}

function getFullSentence(node: Node): string {
  if (!node) {
    return '';
  }

  let sentence = '';
  let prevNode: Node | null = node.previousSibling;
  let nextNode: Node | null = node.nextSibling;

  while (prevNode) {
    if (
      prevNode.nodeType === Node.TEXT_NODE ||
      elementNodeNames.includes(prevNode.nodeName)
    ) {
      const textContent = prevNode.textContent?.trim().replace(/[ \n]+/g, ' ');
      if (textContent) {
        sentence = textContent + ' ' + sentence;
      }
    }

    prevNode = prevNode.previousSibling;
  }

  sentence += node.textContent?.trim().replace(/[ \n]+/g, ' ') || '';

  while (nextNode) {
    if (
      nextNode.nodeType === Node.TEXT_NODE ||
      elementNodeNames.includes(nextNode.nodeName)
    ) {
      const textContent = nextNode.textContent?.trim().replace(/[ \n]+/g, ' ');
      if (textContent) {
        sentence += ' ' + textContent;
      }
    }

    nextNode = nextNode.nextSibling;
  }

  return sentence.trim();
}


function speakText(text) {
  if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    if (text) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  } else {
    console.log('Text-to-speech not supported in this browser.');
  }
}



export default function screenReader(enable = false) {
  if (enable) {
    (window as any).__asw__onClickScreenReader = (event) => {
      var clickedElement = event.target;

      if (!["BODY", "HEAD", "HTML"].includes(clickedElement.nodeName)) {
        var selectedText = getFullSentence(clickedElement);
        speakText(selectedText);
      }
    }

    document.addEventListener('click', (window as any).__asw__onClickScreenReader);
    addScreenReaderSupport();
  } else {
    if ((window as any).__asw__onClickScreenReader) {
      document.removeEventListener('click', (window as any).__asw__onClickScreenReader);
      delete (window as any).__asw__onClickScreenReader;
    }
    removeScreenReaderSupport();
  }
}

function addScreenReaderSupport() {
  // Add ARIA labels to unlabeled elements
  document.querySelectorAll('img:not([alt])').forEach((img, index) => {
    img.setAttribute('alt', `Image ${index + 1}`);
  });
  
  // Add skip links
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = 'position:absolute;top:-40px;left:6px;background:#000;color:#fff;padding:8px;text-decoration:none;z-index:999999';
  skipLink.addEventListener('focus', () => skipLink.style.top = '6px');
  skipLink.addEventListener('blur', () => skipLink.style.top = '-40px');
  document.body.insertBefore(skipLink, document.body.firstChild);
}

function removeScreenReaderSupport() {
  // Remove added skip links
  document.querySelectorAll('a[href="#main"]').forEach(link => link.remove());
}