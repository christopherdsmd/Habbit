//Daily Random Number generator

export function getDailyRandomInt() {
  const date = new Date();
  const seed = date.toISOString().slice(0, 10); // Use the date as a seed , date. returns date 
  const hashedSeed = hashCode(seed);        
  const random = seededRandom(hashedSeed);

  return Math.floor(random * 198);
}

export function getSeed() 
{
  const date = new Date();
  const seed = date.toISOString().slice(0, 10); // Use the date as a seed , date. returns date 
  return seed;
}

// Function to hash the seed
function hashCode(str) {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
}

// Function to generate a seeded random number
function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}


export function getRandomInt() {
  return Math.floor(Math.random() * 198);
}
