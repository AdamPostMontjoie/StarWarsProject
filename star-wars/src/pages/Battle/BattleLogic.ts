import { nonUserShip, FavoriteShip } from "../../interfaces/Ship";

//strings to be displayed after turns
const userLog:string[] = [];
const enemyLog:string[] = [];


interface classStats{
    health:number,
    attack:number,
    quantity:number
}

interface multipliers{
    attackMultiplier:number,
    defenseMultiplier:number
}

export function handleCombatRound(
    userClass: nonUserShip[] | FavoriteShip[], 
    userTarget: nonUserShip[],
    enemyClasses:(nonUserShip[] | FavoriteShip[])[],
    userClasses:(nonUserShip[] | FavoriteShip[])[] 
):{ //return some kind of data log collected during battle for easy display
    userClasses:(nonUserShip[] | FavoriteShip[])[],
    enemyClasses:(nonUserShip[] | FavoriteShip[])[],
    gameOver:boolean
    }{
    const userClassType = userClass[0].properties.class
    const userTargetType = userTarget[0].properties.class
    //first perform user attack
    const userTurnResult = handleAttackerTurn(userClass, userTarget)
    //determine enemy class and target if game not over
    userClass = userTurnResult.attackerClass
    userTarget = userTurnResult.targetClass
    let updatedUserClasses:(nonUserShip[] | FavoriteShip[])[] = []
    let updatedEnemyClasses:(nonUserShip[] | FavoriteShip[])[] = []
    userClasses.forEach((a)=> {
        const currentClassType = a[0].properties.class
        if(currentClassType === userClassType){
            if(userClass.length > 0){
                updatedUserClasses.push(userClass)
            }
        }  else{
            updatedUserClasses.push(a)
        }
    });
    enemyClasses.forEach((a)=> {
        const currentClassType = a[0].properties.class
        if(currentClassType === userTargetType){
            if(userTarget.length > 0){
                updatedEnemyClasses.push(userTarget)
            }
        } else{
            updatedEnemyClasses.push(a)
        }
    });
    //end game if either are destroyed
    if(updatedEnemyClasses.length === 0 || updatedUserClasses.length === 0){
       return endGame()
    }
    //select enemy class and target
    let enemyClass = updatedEnemyClasses[Math.floor(Math.random() * updatedEnemyClasses.length)]
    let enemyTarget = updatedUserClasses[Math.floor(Math.random() * updatedUserClasses.length)]
    //perform enemy attack and get data
    const enemyTurnResult = handleAttackerTurn(enemyClass,enemyTarget)
    userClasses = updatedUserClasses
    enemyClasses = updatedEnemyClasses
    updatedUserClasses = []
    updatedEnemyClasses = []
    let enemyClassType = enemyClass[0].properties.class
    let enemyTargetType = enemyTarget[0].properties.class
    enemyClass = enemyTurnResult.attackerClass
    enemyTarget = enemyTurnResult.targetClass

    userClasses.forEach((a)=> {
        const currentClassType = a[0].properties.class
        if(currentClassType === enemyTargetType){
            if(enemyTarget.length > 0){
                updatedUserClasses.push(enemyTarget)
            }
        }  else{
            updatedUserClasses.push(a)
        }
    });
    enemyClasses.forEach((a)=> {
        const currentClassType = a[0].properties.class
        if(currentClassType === enemyClassType){
            if(enemyClass.length > 0){
                updatedEnemyClasses.push(enemyClass)
            }
        } else{
            updatedEnemyClasses.push(a)
        }
    });

    //updated enemy and user classes for final time, can now return or end game 
    if(updatedEnemyClasses.length === 0 || updatedUserClasses.length === 0){
        return endGame()
     }
     return {
        userClasses:updatedUserClasses,
        enemyClasses:updatedEnemyClasses,
        gameOver:false
     }
}

function endGame():{ //return some kind of data log collected during battle for easy display
    userClasses:(nonUserShip[] | FavoriteShip[])[],
    enemyClasses:(nonUserShip[] | FavoriteShip[])[],
    gameOver:boolean
    }{
        const userClasses:(nonUserShip[] | FavoriteShip[])[] = []
        const enemyClasses:(nonUserShip[] | FavoriteShip[])[] = []
    return {
        userClasses,
        enemyClasses,
        gameOver:true
    }
}

function handleAttackerTurn(attackerClass: nonUserShip[] | FavoriteShip[], targetClass:  nonUserShip[] | FavoriteShip[]):{
    attackerClass:  nonUserShip[] | FavoriteShip[],
    targetClass:  nonUserShip[] | FavoriteShip[]
}{
    //gather stats on both classes
    let attackerStats = gatherClassStats(attackerClass)
    let targetStats = gatherClassStats(targetClass)
    //determine relationship between classes
    let multipliers = addMultipliers(attackerClass[0].properties.class, targetClass[0].properties.class)
    attackerStats.attack *= multipliers.attackMultiplier 
    targetStats.health *= multipliers.defenseMultiplier 
    const result = determineFight(attackerClass,targetClass,attackerStats, targetStats)
    attackerClass = result.attackerClass
    targetClass = result.targetClass
    //update stats on both classes
    return {
        attackerClass,
        targetClass
    }    
}

//will return object with data


function gatherClassStats(shipClass:nonUserShip[] | FavoriteShip[]):classStats{
    let stats:classStats = {health:0,attack:0,quantity:0}
    for(let i = 0; i < shipClass.length; i++){
        const quantity = shipClass[i].quantity
        stats.quantity += quantity;
        stats.health += (shipClass[i].properties.health * quantity);
        stats.attack += (shipClass[i].properties.attack * quantity);
    }
    return stats
}

function addMultipliers(attackerClassType:string, targetClassType:string):multipliers{
    const defaultMultipliers: multipliers = {
        attackMultiplier: 1,
        defenseMultiplier: 1
    };
    //balance later
    const matchupMultipliers: { [key: string]: multipliers } = {
        "Starfighter-Capital": { attackMultiplier: 1, defenseMultiplier: 2.5 },
        "Bomber-Capital": { attackMultiplier: 2.5, defenseMultiplier: 1 },
        "Capital-Starfighter": { attackMultiplier: 1.5, defenseMultiplier: 1 },
        "Bomber-Starfighter": { attackMultiplier: 2, defenseMultiplier: 1 },
        "Starfighter-Bomber": { attackMultiplier: 2.5, defenseMultiplier: 1 },
        "Capital-Bomber": { attackMultiplier: 0.5, defenseMultiplier: 2 },
        
    };
    const matchupKey = `${attackerClassType}-${targetClassType}`;
    return matchupMultipliers[matchupKey] || defaultMultipliers;
}

function determineFight(
    attackerClass: nonUserShip[] | FavoriteShip[],
     targetClass: nonUserShip[] | FavoriteShip[], 
     attackerStats:classStats,
      targetStats:classStats
    ):{
        attackerClass:nonUserShip[] | FavoriteShip[],
        targetClass:nonUserShip[] | FavoriteShip[]
    }{
    let remainingAttackPower = attackerStats.attack
    let remainingTargetPower = targetStats.attack

    const updatedTargetClass = dealDamage(targetClass,remainingAttackPower)
    let updatedAttackerClass = dealDamage(attackerClass, remainingTargetPower)

    if (updatedTargetClass.length === 0 && updatedAttackerClass.length === 0) {
        // If both eliminate each other, attacker gets to live
        updatedAttackerClass = attackerClass.slice(attackerClass.length - 1);
    }
    return {
        attackerClass:updatedAttackerClass,
        targetClass:updatedTargetClass
    }
}

function dealDamage(shipClass:(nonUserShip | FavoriteShip)[], remainingAttackPower:number):nonUserShip[] | FavoriteShip[]{
    type Accumulator = {
        remainingAttack: number;
        ships: (nonUserShip | FavoriteShip)[];
    };

    const initialAccumulator: Accumulator = {
        remainingAttack: remainingAttackPower,
        ships: [] as (nonUserShip | FavoriteShip)[]
    };

    const damagedShipClass = shipClass.reduce<Accumulator>(
        (acc:Accumulator, currentShip:(nonUserShip | FavoriteShip)) => {
            if (acc.remainingAttack <= 0) {
                // Add the current ship and all subsequent ships from the original targetClass
                acc.ships.push(currentShip)
                return acc; // Return early, as no more damage can be dealt
            }
            let tempShip = { ...currentShip }; 
            const shipIndividualHealth = tempShip.properties.health;
            const shipTotalHealth = shipIndividualHealth * tempShip.quantity;
            // Check if current attack power can destroy the entire current ship (all its units)
            if (acc.remainingAttack >= shipTotalHealth) {
                acc.remainingAttack -= shipTotalHealth;
            } else {
                // Attack power is NOT enough to destroy this entire ship (all its units)
                const destroyedUnits = Math.floor(acc.remainingAttack / shipIndividualHealth);
                if (destroyedUnits > 0) {
                    // Destroy some units of the current ship
                    tempShip.quantity -= destroyedUnits;
                    acc.remainingAttack = 0; 
                    acc.ships.push(tempShip); // Add the partially destroyed ship
                } else {
                    // This ship and all subsequent ships survive untouched.
                    acc.remainingAttack = 0; // No effective attack left
                    acc.ships.push(currentShip); // Add this ship 
                }
            }
            return acc;
        },
        initialAccumulator);// Initial accumulator
        return damagedShipClass.ships
}
