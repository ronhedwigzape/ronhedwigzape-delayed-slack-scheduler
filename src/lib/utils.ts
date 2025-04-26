
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A helper to conditionally join Tailwind CSS classes without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
