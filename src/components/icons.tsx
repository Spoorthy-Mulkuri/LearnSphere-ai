import { type LucideProps } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z" />
      <path d="M12 2a10 10 0 0 0-4.08 19.33" />
      <path d="M12 2a10 10 0 0 1 4.08 19.33" />
      <path d="M15.59 12.51a3.5 3.5 0 0 1-7.18 0" />
      <path d="M12 18a3.5 3.5 0 0 1-3.5-3.5" />
      <path d="M12 18a3.5 3.5 0 0 0 3.5-3.5" />
    </svg>
  ),
};
