
type SingleBarWeapon = "stick" | "toyKnife" | "dagger" | "knife";
type MultiBarWeapon = "shoes" | "notebook" | "pan" | "gun";
type Weapon = SingleBarWeapon | MultiBarWeapon | 'glove';
type Result = [number, number, number];


const WeaponsDefenseMap: {[K in Weapon]: number} = {
    stick: 0,
    toyKnife: 3,
    glove: 5,
    shoes: 7,
    notebook: 2,
    pan: 10,
    gun: 12,
    dagger: 15,
    knife: 99
};

const BarsMap: {[K in MultiBarWeapon]: number} = {
    shoes: 3,
    notebook: 2,
    pan: 4,
    gun: 4
}


const LVToAttack = (lv: number) => lv === 20 ? 30 : (8 + 2*lv);

const calculateSingleBar = (weapon: SingleBarWeapon, lv: number, defense: number): Result => {
    const baseResult = (LVToAttack(lv) + WeaponsDefenseMap[weapon] - defense) * 2.2;

    return [
        Math.round(baseResult + 2*2.2),
        Math.round(baseResult + 1*2.2),
        Math.round(baseResult + 0*2.2),
    ]
}

const calculateToughGlove = (weapon: "glove",lv: number, defense: number): Result =>  {
    const baseResult = (LVToAttack(lv) + WeaponsDefenseMap[weapon] - defense) * 2.1;

    return [
        Math.round(baseResult + 2*2.1),
        Math.round(baseResult + 1*2.1),
        Math.round(baseResult + 0*2.1),
    ]

}

const calculateMultiBar = (weapon: MultiBarWeapon, lv: number, defense: number): Result => {
    let score = 110 * BarsMap[weapon];
    score *= score > 430 ? 2.25*1.25 : (score > 400 ? 1.25 : 0); 
    const baseResult = (WeaponsDefenseMap[weapon] + LVToAttack(lv) - defense) * score/160 * 4/BarsMap[weapon];
    return [
        Math.round(baseResult + 2),
        Math.round(baseResult + 1),
        Math.round(baseResult + 0),
    ]
}

const eleWeapon = document.getElementById("weapon") as HTMLSelectElement;
const eleLV = document.getElementById("lv") as HTMLInputElement;
const eleDefense = document.getElementById("defense") as HTMLInputElement;

const eleBest = document.getElementById("best");
const eleAverage = document.getElementById("average");
const eleWorst = document.getElementById("worst");

/* exported onSubmit */
const onSubmit = () => { 
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
    
    eleBest.innerText = result[0].toString();
    eleAverage.innerText = result[1].toString();
    eleWorst.innerText = result[2].toString();

}
