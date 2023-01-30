import {sveltekit} from '@sveltejs/kit/vite';
import type {UserConfig} from 'vite';
import i18n from "@abineo/sveltekit-i18n"

const config: UserConfig = {
    plugins: [i18n({
        src: "./src/lib/i18n/locales",
        out: "./src/lib/i18n/generated",
        defaultLanguage: "en"
    }), sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
};

export default config;
