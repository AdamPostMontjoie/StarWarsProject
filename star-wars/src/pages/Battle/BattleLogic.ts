import { nonUserShip, FavoriteShip } from "../../interfaces/Ship";
import { classStats, multipliers } from "../../interfaces/Battle";



export function handleUserTurn(
    userClass: nonUserShip[] | FavoriteShip[], 
    userTarget: nonUserShip[],
    enemyClasses: (nonUserShip[] | FavoriteShip[])[],
    userClasses: (nonUserShip[] | FavoriteShip[])[] 
): {
    userClasses: (nonUserShip[] | FavoriteShip[])[],
    enemyClasses: (nonUserShip[] | FavoriteShip[])[],
    gameOver: boolean,
    userTurnLog: string[],
    winner:string
} {
    let userTurnLog: string[] = [];

    // First perform user attack
    const userTurnResult = handleAttackerTurn(userClass, userTarget, "User", "Enemy");

    const userClassType = userClass[0].properties.class;
    const userTargetType = userTarget[0].properties.class;

    userClass = userTurnResult.attackerClass;
    userTarget = userTurnResult.targetClass;
    userTurnLog.push(...userTurnResult.log);

    let updatedUserClasses: (nonUserShip[] | FavoriteShip[])[] = [];
    let updatedEnemyClasses: (nonUserShip[] | FavoriteShip[])[] = [];

    userClasses.forEach((a) => {
        const currentClassType = a[0].properties.class;
        if (currentClassType === userClassType) {
            if (userClass.length > 0) {
                updatedUserClasses.push(userClass);
            }
        } else {
            updatedUserClasses.push(a);
        }
    });

    enemyClasses.forEach((a) => {
        const currentClassType = a[0].properties.class;
        if (currentClassType === userTargetType) {
            if (userTarget.length > 0) {
                updatedEnemyClasses.push(userTarget);
            }
        } else {
            updatedEnemyClasses.push(a);
        }
    });

    // Check for game over after user's attack
    if (updatedEnemyClasses.length === 0 || updatedUserClasses.length === 0) {
        let winnerName
        if(updatedEnemyClasses.length === 0) winnerName = "User"
        else winnerName = "Enemy"
        return {
            userClasses: updatedUserClasses,
            enemyClasses: updatedEnemyClasses,
            gameOver: true,
            userTurnLog: userTurnLog,
            winner: winnerName
        };
    }

    return {
        userClasses: updatedUserClasses,
        enemyClasses: updatedEnemyClasses,
        gameOver: false,
        userTurnLog: userTurnLog,
        winner: ""
    };
}

export function handleEnemyTurn(
    userClasses: (nonUserShip[] | FavoriteShip[])[],
    enemyClasses: (nonUserShip[] | FavoriteShip[])[]
): {
    userClasses: (nonUserShip[] | FavoriteShip[])[],
    enemyClasses: (nonUserShip[] | FavoriteShip[])[],
    gameOver: boolean,
    enemyTurnLog: string[]
    winner:string
} {
    let enemyTurnLog: string[] = [];
    let updatedUserClasses: (nonUserShip[] | FavoriteShip[])[] = [];
    let updatedEnemyClasses: (nonUserShip[] | FavoriteShip[])[] = [];
    let gameOver = false;
    let winnerName = ""
    // Select enemy class and target
    let enemyClass = enemyClasses[Math.floor(Math.random() * enemyClasses.length)];
    let enemyTarget = userClasses[Math.floor(Math.random() * userClasses.length)];

    // Perform enemy attack and get data
    const enemyTurnResult = handleAttackerTurn(enemyClass, enemyTarget, "Enemy", "User");

    let enemyClassType = enemyClass[0].properties.class;
    let enemyTargetType = enemyTarget[0].properties.class;

    enemyClass = enemyTurnResult.attackerClass;
    enemyTarget = enemyTurnResult.targetClass;
    enemyTurnLog.push(...enemyTurnResult.log);

    userClasses.forEach((a) => {
        const currentClassType = a[0].properties.class;
        if (currentClassType === enemyTargetType) {
            if (enemyTarget.length > 0) {
                updatedUserClasses.push(enemyTarget);
            }
        } else {
            updatedUserClasses.push(a);
        }
    });

    enemyClasses.forEach((a) => {
        const currentClassType = a[0].properties.class;
        if (currentClassType === enemyClassType) {
            if (enemyClass.length > 0) {
                updatedEnemyClasses.push(enemyClass);
            }
        } else {
            updatedEnemyClasses.push(a);
        }
    });

    // Final game over check
    if (updatedEnemyClasses.length === 0 || updatedUserClasses.length === 0) {
        gameOver = true;
        if(updatedEnemyClasses.length === 0) winnerName = "User"
        else if(updatedUserClasses.length === 0) winnerName = "Enemy"
    }

    return {

        userClasses: updatedUserClasses,
        enemyClasses: updatedEnemyClasses,
        gameOver: gameOver,
        enemyTurnLog: enemyTurnLog,
        winner: winnerName
    };
}


function handleAttackerTurn(attackerClass: nonUserShip[] | FavoriteShip[], targetClass:  nonUserShip[] | FavoriteShip[], attackerName:string,targetName:string):{
    attackerClass:  nonUserShip[] | FavoriteShip[],
    targetClass:  nonUserShip[] | FavoriteShip[],
    log:string[],
}{
    let log:string[] = []
    //gather stats on both classes
    let attackerStats = gatherClassStats(attackerClass)
    let targetStats = gatherClassStats(targetClass)
    //determine relationship between classes
    let multipliers = addMultipliers(attackerClass[0].properties.class, targetClass[0].properties.class)
    attackerStats.attack *= multipliers.attackMultiplier 
    targetStats.health *= multipliers.defenseMultiplier 
    const result = determineFight(attackerClass,targetClass,attackerStats, targetStats, attackerName,targetName)
    attackerClass = result.attackerClass
    targetClass = result.targetClass
    log.push(...result.log)
    //update stats on both classes
    return {
        attackerClass,
        targetClass,
        log
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
        "Starfighter-Capital": { attackMultiplier: 1, defenseMultiplier: 2 },
        "Bomber-Capital": { attackMultiplier: 3, defenseMultiplier: 1 },
        "Capital-Starfighter": { attackMultiplier: 1, defenseMultiplier: 1 },
        "Bomber-Starfighter": { attackMultiplier: 1, defenseMultiplier: 3 },
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
      targetStats:classStats,
      attackerName:string,
      targetName:string
    ):{
        attackerClass:nonUserShip[] | FavoriteShip[],
        targetClass:nonUserShip[] | FavoriteShip[],
        log:string[]
    }{
    let remainingAttackPower = attackerStats.attack
    let remainingTargetPower = targetStats.attack
    let log:string[] = []
    const updatedTargetClass = dealDamage(targetClass,remainingAttackPower,attackerName, targetName)
    log.push(...updatedTargetClass.log)
    let updatedAttackerClass = dealDamage(attackerClass, remainingTargetPower,targetName, attackerName)
    log.push(...updatedAttackerClass.log)
    if (updatedTargetClass.damagedShips.length === 0 && updatedAttackerClass.damagedShips.length === 0) {
        // If both eliminate each other, attacker gets to live
        const lastAttackerShip = attackerClass[attackerClass.length - 1];
        const survivor = { ...lastAttackerShip, quantity: 1 };
        updatedAttackerClass.damagedShips = [survivor];
        log.push(`${attackerName}'s ${survivor.properties.class === "Capital" ? `${survivor.properties.class} Ship`:`${survivor.properties.class}`} group was destroyed in the final volley, but a single ${survivor.properties.name} survived.`);
    }
    return {
        attackerClass:updatedAttackerClass.damagedShips,
        targetClass:updatedTargetClass.damagedShips,
        log
    }
}

function dealDamage(shipClass:(nonUserShip | FavoriteShip)[], remainingAttackPower:number,attacker:string, target:string):{
   damagedShips:nonUserShip[] | FavoriteShip[],
    log:string[]
}
{
    type Accumulator = {
        remainingAttack: number;
        ships: (nonUserShip | FavoriteShip)[];
    };

    const initialAccumulator: Accumulator = {
        remainingAttack: remainingAttackPower,
        ships: [] as (nonUserShip | FavoriteShip)[]
    };

    const log:string[] = []

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
                log.push(`${attacker} wiped out ${target}'s ${currentShip.quantity === 1 ? `${currentShip.properties.name}` : `group of ${currentShip.properties.name}'s`}`)
            } else {
                // Attack power is NOT enough to destroy this entire ship (all its units)
                const destroyedUnits = Math.floor(acc.remainingAttack / shipIndividualHealth);
                if (destroyedUnits > 0) {
                    // Destroy some units of the current ship
                    log.push(`${attacker} destroyed ${destroyedUnits} of ${target}'s ${currentShip.properties.name}'s`)
                    tempShip.quantity -= destroyedUnits;
                    acc.remainingAttack = 0; 
                    acc.ships.push(tempShip); // Add the partially destroyed ship
                } else {
                    // This ship and all subsequent ships survive untouched.
                    log.push(`${attacker}'s attack failed to damage ${target}'s ${currentShip.properties.name}.`)
                    acc.remainingAttack = 0; // No effective attack left
                    acc.ships.push(tempShip); // Add this ship 
                }
            }
            return acc;
        },
        initialAccumulator);// Initial accumulator
        return {
           damagedShips: damagedShipClass.ships,
           log
        }
}
