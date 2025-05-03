"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Search, Moon, Sun, LogIn, LogOut } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import IsAdmin from "@/components/roles/isAdmin"
import { useRouter } from "next/navigation"
import IsLoggedOut from "@/components/roles/isLoggedOut"
import IsLoggedIn from "@/components/roles/isLoggedIn"
import { useUserContext } from "@/providers/UserProvider"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-foreground hover:text-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </Link>
)

export function Navbar() {
  const { signOut } = useUserContext()
  const [isOpen, setIsOpen] = React.useState(false)
  const { setTheme, theme } = useTheme()
  const router = useRouter()

  return (
    <nav className="bg-background shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-foreground">
                Logo
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/">Home</NavLink>
                <IsAdmin>
                  <NavLink href="/admin">Admin</NavLink>
                </IsAdmin>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/achievements">Achievements</NavLink>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3 py-2 text-sm font-medium">
                      Services
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/achievements">Achievemnts</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/services/app-development">App Development</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/services/consulting">Consulting</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input type="search" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <IsLoggedOut>
              <Button variant="ghost" size="icon" onClick={() => router.push('/login')}><LogIn /></Button>
            </IsLoggedOut>
            <IsLoggedIn>
              <Button variant="ghost" size="icon" onClick={() => signOut()}><LogOut /></Button>
            </IsLoggedIn>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input type="search" placeholder="Search..." className="pl-10 pr-4 py-2 w-full" />
            </div>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/achievements">Achievements</NavLink>
            <NavLink href="/contact">Contact</NavLink>


            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-3"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <div className="flex">
            <IsLoggedOut>
              <Button className="w-44 m-3" variant="outline" onClick={() => router.push('/login')}>Log In</Button>
            </IsLoggedOut>
            <IsLoggedIn>
              <Button className="w-44 m-3" variant="destructive" onClick={() => signOut()}>Log Out<LogOut /></Button>
            </IsLoggedIn>
          </div>
        </div>
      )}
    </nav>
  )
}

