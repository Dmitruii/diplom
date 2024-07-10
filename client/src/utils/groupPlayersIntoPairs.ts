import { IGamePLayer, IMatch } from "@/lib/types";

// Function to group players into pairs
function groupPlayersIntoPairs(playersArray: IGamePLayer[], init: boolean = false): IMatch[] {
    const pairs = [];

    for (let i = 0; i < playersArray.length; i += 2) {
        pairs.push({
            players: init ? [] : [playersArray[i], playersArray[i + 1]],
            matchId: Math.round((Math.random() * 1000000))
        } as IMatch);
    }

    return pairs;
}

export default groupPlayersIntoPairs