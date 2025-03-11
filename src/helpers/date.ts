export const convertDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB');
}

export const convertDateTime = (date: string): string => {
  return new Date(date).toLocaleString('en-GB');
}