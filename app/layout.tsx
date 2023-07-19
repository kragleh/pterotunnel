import './globals.css'
import { Metadata } from 'next'
import Copyright from '../components/Copyright'
 
export const metadata: Metadata = {
  title: 'Pterotunnel',
  description: 'Welcome to your Pterotunnel',
  themeColor: '#06b6d4'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  )
}