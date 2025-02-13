const isPalindrome = (val) => {
  if (!val) return null;
  if (typeof val !== "string" && typeof val !== "number") return null;
  
  let x = typeof val === "number" ? String(Math.abs(val)) : val.trim().toLowerCase();
  x = x.split(" ")[0]

  if (x.length > 10) return null;
  if (x.length === 1) return true;
  
  let i = 0;
  let j = x.trim().length-1;
  while (i <= j) {
    if (x[i] !== x[j]) return false
    i++;
    j--;
  }
  return true;

};

module.exports = isPalindrome;
