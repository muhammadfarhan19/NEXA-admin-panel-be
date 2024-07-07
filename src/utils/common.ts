import moment from "moment";

export const dateConverter = (isoDate: string): string => {
  return moment(isoDate).format("DD/MM/YYYY");
};
