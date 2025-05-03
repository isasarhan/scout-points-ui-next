import { Status } from "@/types/achievement"
import { Rank } from "@/types/user"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getRankColor = (rank?: Rank) => {
  switch (rank) {
    case Rank.LEADER:
      return "text-white justify-center p-2 rounded-full bg-gray-500 "

    case Rank.SCOUT:
      return "text-white justify-center p-2 rounded-full bg-green-500"

    case Rank.ROVER:
      return "text-white justify-center p-2 rounded-full bg-red-500"

    case Rank.CUB:
      return "text-white justify-center p-2 rounded-full bg-blue-500"

    case Rank.ADVANCED_SCOUT:
      return "text-white justify-center p-2 rounded-full bg-gradient-to-r from-red-500 to-green-500"

    default:
      return "text-white justify-center p-2 rounded-full bg-gray-  00"
  }
}
export const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 justify-center p-2 rounded-full';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 justify-center p-2 rounded-full';
    case 'advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 justify-center p-2 rounded-full';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 justify-center p-2 rounded-full';
  }
};
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export const getStatusColor = (status?: Status) => {
  switch (status) {
    case Status.Pending:
      return 'bg-orange-200 justify-center p-2 rounded-full'
    default:
      return 'bg-slate-100 justify-center p-2 rounded-full'
  }
}