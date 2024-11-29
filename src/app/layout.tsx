// // import { ThemeProvider } from '@mui/material/styles';
// // import { CssBaseline } from '@mui/material';
// import theme from './theme/theme';
// import { Roboto } from 'next/font/google';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import { ThemeProvider } from '@mui/material/styles';
// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto',
// });

// // export default function RootLayout(props: any) {
// //   const { children } = props;

// //   return (
// //     <html lang="en">
// //       <body>
// //         {/* <AppRouterCacheProvider options={{ key: 'css' }}> */}
// //         {/* <ThemeProvider theme={theme}> */}
// //         {/* <CssBaseline /> */}
// //         {children}
// //         {/* </ThemeProvider> */}
// //         {/* </AppRouterCacheProvider> */}
// //       </body>
// //     </html>
// //   );
// // }

// export default function RootLayout(props: any) {
//   const { children } = props;
//   return (
//     <html lang="en">
//       <body className={roboto.variable}>
//         <AppRouterCacheProvider>
//           {/* {children} */}
//           <ThemeProvider theme={theme}>{children}</ThemeProvider>
//         </AppRouterCacheProvider>
//       </body>
//     </html>
//   );
// }

// // import { ThemeProvider } from '@mui/material/styles';
// // import { CssBaseline } from '@mui/material';
// // import theme from './theme/theme';

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <body>
// //         <ThemeProvider theme={theme}>
// //           <CssBaseline /> {/* Normalize and reset styles */}
// //           {children} {/* Your page content */}
// //         </ThemeProvider>
// //       </body>
// //     </html>
// //   );
// // }

import theme from './theme/theme';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
