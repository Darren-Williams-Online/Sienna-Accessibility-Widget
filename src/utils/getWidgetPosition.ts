export interface WidgetPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

export function getWidgetPosition(): WidgetPosition {
  const script = document.getElementById('accessibility') as HTMLScriptElement;
  
  if (!script) {
    // Default position if script not found
    return { top: '20px', right: '20px', left: 'auto' };
  }

  const position = script.getAttribute('position');
  
  if (!position) {
    // Default position if no position attribute
    return { top: '20px', right: '20px', left: 'auto' };
  }

  const positionMap: Record<string, WidgetPosition & { transform?: string }> = {
    'top_left': { top: '20px', left: '20px' },
    'top_center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
    'top_right': { top: '20px', right: '20px', left: 'auto' },
    'middle_left': { top: '50%', left: '20px', transform: 'translateY(-50%)' },
    'middle_right': { top: '50%', right: '20px', left: 'auto', transform: 'translateY(-50%)' },
    'bottom_left': { bottom: '20px', left: '20px' },
    'bottom_center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
    'bottom_right': { bottom: '20px', right: '20px', left: 'auto' }
  };

  // Handle multiple positions (use first valid one)
  const positions = position.split(',').map(p => p.trim());
  
  for (const pos of positions) {
    if (positionMap[pos]) {
      return positionMap[pos];
    }
  }

  // Fallback to default
  return { top: '20px', right: '20px', left: 'auto' };
}