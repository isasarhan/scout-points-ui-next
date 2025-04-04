import { Rank } from "@/types/user"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getRankColor = (rank?: Rank) => {
        
  switch (rank) {
      case Rank.LEADER:
          return "text-white p-2 rounded-full bg-gray-500"
      case Rank.SCOUT:
          return "text-white p-2 rounded-full bg-green-500"
          
      case Rank.ROVER:
          return "text-white p-2 rounded-full bg-red-500"
          
      case Rank.CUB:
          return "text-white p-2 rounded-full bg-blue-500"
          
      case Rank.ADVANCED_SCOUT:
          return "text-white p-2 rounded-full bg-gradient-to-r from-red-500 to-green-500"

      default:
          return "text-white p-2 rounded-full bg-gray-500"
  }
}

export const getInitials = (name: string) => {
  return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
}
