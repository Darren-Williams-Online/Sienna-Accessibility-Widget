import { $menu } from "./menu";

export default function toggleMenu() {
    // Find the actual menu element in the DOM since it's dynamically created
    const menuElement = document.querySelector('.asw-menu');
    const overlayElement = document.querySelector('.asw-overlay');
    
    if (menuElement) {
        // Menu exists, toggle it
        menuElement.classList.toggle('asw-hidden');
        
        // Hide/show overlay with menu
        if (overlayElement) {
            if (menuElement.classList.contains('asw-hidden')) {
                overlayElement.style.display = 'none';
            } else {
                overlayElement.style.display = 'block';
            }
        }
    } else {
        // Menu doesn't exist, use original display toggle for $menu
        if ($menu) {
            $menu.style.display = $menu.style.display === "none" ? "flex" : "none";
        }
    }
}