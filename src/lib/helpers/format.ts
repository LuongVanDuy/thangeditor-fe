import dayjs from "dayjs";
import { format } from "date-fns";

// Currency formatting
export function formatCurrency(amount: number): string {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount.replace("$", "").trim() + "$";
}

export const formatCurrencyVND = (amount: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(amount);
};

export function convertToSubCurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export function formatTwoDigit(value: number) {
  if (isNaN(value)) return value;
  let formattedValue = value.toFixed(2);
  return formattedValue;
}

// Date formatting
export function formatTextDate(dateString: any) {
  const dayjsDate = dayjs(dateString);
  const day = dayjsDate.date();

  const suffix = (day: number): string => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return dayjsDate.format(`ddd, MMM D[${suffix(day)}] YYYY`);
}

export function formatDateToShort(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export const convertUnixTimestampToISO = (timestamp: any) => {
  return format(new Date(timestamp), "dd/MM/yyyy' - 'HH:mm");
};
