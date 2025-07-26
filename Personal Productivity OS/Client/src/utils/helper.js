import {
  AlertCircle,
  Clock,
  CheckCircle,
} from "lucide-react";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeprator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};


export const getPriorityConfig = (priority) => {
  switch (priority) {
    case "high":
      return {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: AlertCircle,
        label: "High",
      };
    case "medium":
      return {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
        label: "Medium",
      };
    case "low":
      return {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
        label: "Low",
      };
    default:
      return {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: Clock,
        label: "Low",
      };
  }
};