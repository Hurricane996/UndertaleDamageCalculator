
type SingleBarWeapon = "stick" | "toyKnife" | "dagger" | "knife";
type MultiBarWeapon = "shoes" | "notebook" | "pan" | "gun";
export type Weapon = SingleBarWeapon | MultiBarWeapon | 'glove';
export type Result = [number, number, number];

const WeaponsAttackMap: {[K in Weapon]: number} = {
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


const LVToAttack = (lv: number) => lv === 20 ? 30 : 2*lv + 8;

export const calculateSingleBar = (weapon: SingleBarWeapon, lv: number, defense: number): Result => {
    const baseResult = (LVToAttack(lv) + WeaponsAttackMap[weapon] - defense) * 2.2;

    return [
        Math.round(baseResult + 2*2.2),
        Math.round(baseResult + 1*2.2),
        Math.round(baseResult + 0*2.2),
    ]
}

export const calculateToughGlove = (weapon: "glove",lv: number, defense: number): Result =>  {
    const baseResult = (LVToAttack(lv) + WeaponsAttackMap[weapon] - defense) * 2.1;

    return [
        Math.round(baseResult + 2*2.1),
        Math.round(baseResult + 1*2.1),
        Math.round(baseResult + 0*2.1),
    ]

}

export const calculateMultiBar = (weapon: MultiBarWeapon, lv: number, defense: number): Result => {

    const attack = LVToAttack(lv) + WeaponsAttackMap[weapon];

    let score = 110 * BarsMap[weapon];
    
    score *= score > 430 ? 2.25 : (score > 400 ? 1.25 : 0); 
    console.log(score)
    
    const baseResult = (attack - defense) * score/160 * 4/BarsMap[weapon];
    return [
        Math.round(baseResult ) + 2,
        Math.round(baseResult ) + 1,
        Math.round(baseResult) + 0,
    ]
}