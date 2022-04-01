import { useEffect } from 'react';
import { useTheme } from 'next-themes'

export function ThemeSwitcher({ style }) {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light';
        setTheme(theme);
    }, []);

    function toggleTheme() {
        const savedTheme = localStorage.getItem('theme') || theme;
        const theme =  savedTheme === 'light' ? 'dark' : 'light';
        setTheme(theme);
        localStorage.setItem('theme', theme);
    }

    return theme === 'light' ? 
        <svg className={style} onClick={toggleTheme} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V3" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.3787 7.62132L18.5 5.5" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.3787 16.3787L18.5 18.5" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.62132 16.3787L5.5 18.5" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.62132 7.62132L5.5 5.5" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 12L21 12" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18L12 21" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 12L3 12" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M15 12C15 13.657 13.657 15 12 15C10.343 15 9 13.657 9 12C9 10.343 10.343 9 12 9C13.657 9 15 10.343 15 12Z" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>                            
        : 
        <svg className={style} onClick={toggleTheme} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_320_3081)">
                <path d="M8.72937 18.0815C12.342 21.6941 18.1982 21.6941 21.8108 18.0815C13.2814 17.1601 10.1495 14.5788 8.72937 5C5.11676 8.61261 5.11676 14.4689 8.72937 18.0815Z" stroke="#200E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_320_3081">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </svg>
}