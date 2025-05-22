import './globals.css'
import { verifySession } from "@/lib/session";
import Navigation from "@/components/Navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result=await verifySession();
  
  return (
    <html lang="en">
      <body>
        <Navigation isAuth={result.isAuth} />
        {children}
      </body>
    </html>
  );
}
