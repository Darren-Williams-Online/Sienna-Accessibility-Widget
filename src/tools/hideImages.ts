

export default function hideImages(isActive: boolean): void {
    if (isActive) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            (img as HTMLElement).style.visibility = 'hidden';
            img.setAttribute('data-sienna-hidden', 'true');
        });
    } else {
        const images = document.querySelectorAll('img[data-sienna-hidden="true"]');
        images.forEach(img => {
            (img as HTMLElement).style.visibility = 'visible';
            img.removeAttribute('data-sienna-hidden');
        });
    }
}