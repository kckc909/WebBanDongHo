
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
     
import 'primereact/resources/themes/lara-light-blue/theme.css';  // Chọn theme phù hợp
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'boxicons/css/boxicons.min.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
   
      <PrimeReactProvider> {children}</PrimeReactProvider>
      </body>
    </html>
  );
}
