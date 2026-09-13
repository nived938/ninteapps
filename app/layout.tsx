import './globals.css'

export const metadata = {
  title: 'NinteApps - Install multiple apps at once',
  description: 'Pick the apps you need and install them together.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
