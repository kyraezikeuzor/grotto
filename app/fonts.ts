// app/fonts.ts
import localFont from 'next/font/local'

export const sfPro = localFont({
  src: [
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Light-Italic.woff2', weight: '300', style: 'italic' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Thin-Italic.woff2', weight: '200', style: 'italic' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Ultralight-Italic.woff2', weight: '100', style: 'italic' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Heavy-Italic.woff2', weight: '800', style: 'italic' },
    { path: '../public/fonts/sf-pro/SF-Pro-Display-Black-Italic.woff2', weight: '900', style: 'italic' },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
})