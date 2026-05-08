import './globals.css' // <--- यह लाइन सबसे ऊपर होनी चाहिए

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
