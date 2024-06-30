import moment from "moment";
import constants from "./constants";

export const getImg = (url: string | null) => {
  if(!url) return null;
  return `url(${constants.imageUrl}${url})`;
}


export const formattedDate = (value: string) => {
  if(!value) return 'N/A';
  return moment(value).format('DD MMM YYYY');
}