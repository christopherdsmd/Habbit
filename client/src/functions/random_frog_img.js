
import { getRandomInt } from './DailyrandomNumber.jsx';

const imagePaths = [];

for (let i = 0; i < 198; i++) {
  imagePaths.push(`./frog_photos/frog_${i}.png`);
}

export function getRandomFrogImage() {
  const randNum = getRandomInt(0, 197);
  return imagePaths[randNum];
}



//light/dark mode function 
export function lightDarkmode()
{
var appHeader = document.querySelector('.App-header');

if(appHeader)
if(appHeader.style.backgroundColor === 'rgb(15, 14, 17)') //black - default
{
  appHeader.style.backgroundColor = 'rgb(255, 255, 255)'    //white
  appHeader.style.color = 'rgb(15, 14, 17)' 
  
} else 
{
  appHeader.style.backgroundColor = 'rgb(15, 14, 17)';
  appHeader.style.color = 'rgb(255, 255, 255)'
}
}

//0f0e11f5