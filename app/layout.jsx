import "./globals.css";
import Provider from "@/providers/lazy-wagmi-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
