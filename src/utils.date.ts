import { DateFormatter } from "@internationalized/date";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";

export const dayNames = [
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jum'at",
  "sabtu",
  "minggu",
] as const;

const dateFormatter = new DateFormatter("id-ID", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hour12: true,
  minute: "2-digit",
});
export const formatDate = (date: Date) => {
  const dateString = dateFormatter.format(date);
  // hanya tampilkan jarak waktu bila belum lewat tenggat
  if (new Date() > date) return dateString;

  const distance = formatDistanceToNowStrict(date, { locale: id });
  return `${dateString} (${distance} lagi)`;
};
