import {Weapon, Result, calculateSingleBar, calculateMultiBar, calculateToughGlove} from "./calc"


const eleWeapon = document.getElementById("weapon") as HTMLSelectElement;
const eleLV = document.getElementById("lv") as HTMLInputElement;
const eleDefense = document.getElementById("defense") as HTMLInputElement;

const eleBest = document.getElementById("best") as HTMLOutputElement;
const eleAverage = document.getElementById("average") as HTMLOutputElement;
const eleWorst = document.getElementById("worst") as HTMLOutputElement;

document.getElementById("inputForm")?.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const lv = parseInt(eleLV.value);
    const weapon = eleWeapon.value as Weapon;
    const defense = parseInt(eleDefense.value);

    let result: Result | undefined = undefined;

    switch(weapon) {
        case "stick":
        case "toyKnife":
        case "knife":
        case "dagger":
            result = calculateSingleBar(weapon, lv, defense)
            break;
        case "shoes":
        case "notebook":
        case "pan":
        case "gun":
            result = calculateMultiBar(weapon, lv, defense);
            break;
        case "glove":
            result = calculateToughGlove(weapon,lv,defense);
    }
    
    if(eleAverage && eleBest && eleWorst) {
        eleBest.innerText = result[0].toString();
        eleAverage.innerText = result[1].toString();
        eleWorst.innerText = result[2].toString();
    }
});
