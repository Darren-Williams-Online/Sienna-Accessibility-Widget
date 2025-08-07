export interface WidgetSize {
  width: string;
  height: string;
}

export function getWidgetSize(): WidgetSize {
  const script = document.getElementById('accessibility') as HTMLScriptElement;
  
  if (!script) {
    // Default size if script not found
    return { width: '55px', height: '55px' };
  }

  const size = script.getAttribute('size');
  
  if (!size) {
    // Default size if no size attribute
    return { width: '55px', height: '55px' };
  }

  const sizeMap: Record<string, WidgetSize> = {
    'small': { width: '40px', height: '40px' },
    'medium': { width: '55px', height: '55px' },
    'large': { width: '70px', height: '70px' }
  };

  // Handle multiple sizes (use first valid one)
  const sizes = size.split(',').map(s => s.trim());
  
  for (const s of sizes) {
    if (sizeMap[s]) {
      return sizeMap[s];
    }
  }

  // Fallback to default
  return { width: '55px', height: '55px' };
}