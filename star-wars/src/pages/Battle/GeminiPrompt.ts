import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';

interface FleetStats {
    quantity:number,
    capital:number,
    starfighter:number,
    bomber:number
}

export function buildPrompt(
        userTurnLog:string[][],
        enemyTurnLog:string[][],
        initialUserClasses:(nonUserShip[] | FavoriteShip[])[],
        initialEnemyClasses:(nonUserShip[] | FavoriteShip[])[],
        winner:string
        ):string{
        const userStats = gatherFleetStats(initialUserClasses)
        const enemyStats = gatherFleetStats(initialEnemyClasses)
        
        const getFleetComposition = (initialClasses:(nonUserShip[] | FavoriteShip[])[]) => {
            if (initialClasses.length === 0) return 'no ships';
            return initialClasses.map(shipClass => {
                // Use a type assertion to treat shipClass as a single array type.
                const typedShipClass = shipClass as (nonUserShip | FavoriteShip)[];
                const totalQuantity = typedShipClass.reduce((sum, ship) => sum + ship.quantity, 0);
                return `${totalQuantity} ${shipClass[0].properties.class}s`;
            }).join(', ');
        };

        let prompt = ``
        const userFleetComposition = getFleetComposition(initialUserClasses);
        const enemyFleetComposition = getFleetComposition(initialEnemyClasses);
        prompt += `The User's fleet, composed of ${userFleetComposition}, engaged the Enemy's fleet, which deployed ${enemyFleetComposition}. `;

        if (userStats.quantity > enemyStats.quantity * 1.5) {
            prompt += "The User commanded a vastly larger force. ";
        } else if (enemyStats.quantity > userStats.quantity * 1.5) {
            prompt += "The Enemy brought a significantly superior number of ships. ";
        } else if (userStats.quantity > enemyStats.quantity) {
            prompt += "The User's fleet held a numerical advantage. ";
        } else if (enemyStats.quantity > userStats.quantity) {
            prompt += "The Enemy's fleet outnumbered the User's. ";
        } else {
            prompt += "Both fleets were numerically matched. ";
        }

        if (userStats.capital > userStats.starfighter && userStats.capital > userStats.bomber) {
            prompt += "The User's fleet was built around a powerful capital ship core. ";
        } else if (userStats.starfighter > userStats.capital && userStats.starfighter > userStats.bomber) {
            prompt += "The User relied on a swift and agile starfighter fleet. ";
        } else if (userStats.bomber > userStats.capital && userStats.bomber > userStats.starfighter) {
            prompt += "The User's forces were centered on a devastating bomber squadron. ";
        }

        if (enemyStats.capital > enemyStats.starfighter && enemyStats.capital > enemyStats.bomber) {
            prompt += "The Enemy's fleet was built around a powerful capital ship core. ";
        } else if (enemyStats.starfighter > enemyStats.capital && enemyStats.starfighter > enemyStats.bomber) {
            prompt += "The Enemy relied on a swift and agile starfighter fleet. ";
        } else if (enemyStats.bomber > enemyStats.capital && enemyStats.bomber > enemyStats.starfighter) {
            prompt += "The Enemy's forces were centered on a devastating bomber squadron. ";
        }

        prompt += " The battle unfolded as follows: ";
        let userLogIndex = 0;
        let enemyLogIndex = 0;
        let turn = 0;
        
        while (userLogIndex < userTurnLog.length || enemyLogIndex < enemyTurnLog.length) {
            turn++;
            if (userLogIndex < userTurnLog.length) {
                prompt += `\nTurn ${turn} (User's attack):\n`;
                prompt += userTurnLog[userLogIndex].map(log => `- ${log}`).join('\n');
                userLogIndex++;
            }
            if (enemyLogIndex < enemyTurnLog.length) {
                prompt += `\nTurn ${turn} (Enemy's attack):\n`;
                prompt += enemyTurnLog[enemyLogIndex].map(log => `- ${log}`).join('\n');
                enemyLogIndex++;
            }
        }
        prompt += "\n\n";

        if(winner === "User"){
            prompt += "The User ended up winning the battle over the Enemy. ";
        } else {
            prompt += "The Enemy ended up defeating the User's forces. ";
        }

        prompt += "Write a 2 paragraph Star Wars story about this battle. Do not include any numbers or numerical values in the story.";
        return prompt;
}

function gatherFleetStats(initialClasses:(nonUserShip[] | FavoriteShip[])[]):FleetStats{
    let totalQuantity = 0
    let capital = 0;
    let starfighter = 0;
    let bomber = 0;
    for(let i = 0; i < initialClasses.length; i++){
        const currentClass = initialClasses[i]
        const classType = currentClass[0].properties.class;
        for(let j = 0; j < currentClass.length; j++){
            const ship = currentClass[j]
            totalQuantity += ship.quantity;
            if(classType === "Capital") capital+= ship.quantity
            if(classType === "Starfighter") starfighter+= ship.quantity
            if(classType === "Bomber") bomber+= ship.quantity
        }
    }
    return {
        quantity:totalQuantity,
        capital:capital,
        starfighter:starfighter,
        bomber:bomber

    }
}