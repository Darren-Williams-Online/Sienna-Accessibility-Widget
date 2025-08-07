import { $menu } from "./menu";

export default function toggleMenu() {
    // Find the actual menu element in the DOM since it's dynamically created
    const menuElement = document.querySelector('.asw-menu');
    if (menuElement) {
        menuElement.classList.toggle('asw-hidden');
    }
}