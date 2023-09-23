import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifest = {
    name: "NoteAttendance",
    short_name: "NoteAttendance",
    start_url: "/",
    description: "A web app that helps instructors take attendance digitally & performs updates on spreadsheets automatically",
    icons: [
        {
            "src": "icons/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "icons/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    theme_color: "#02825c",
    background_color: "#ffffff"
}

export default defineConfig({
    plugins: [react(), VitePWA({
        manifest:manifest
    })]
})