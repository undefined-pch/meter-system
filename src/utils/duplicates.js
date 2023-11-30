export const duplicates = (str, char) => {
  const charArray = str.split("");
  const occurrences = charArray.filter(c => c === char).length;
  return occurrences;
};
