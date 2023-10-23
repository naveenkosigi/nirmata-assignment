import { TMayBe, TPlayer, TPlayerType } from "../../Types/types";
import getPlayersData from "../../Store/get-players";
import { formatMillisecondsToDateString } from "../../Helpers/dateHelper";

export const getPlayers = (args?: {
  type?: TMayBe<TPlayerType>;
}): Promise<TPlayer[]> => {
  return getPlayersData(args).then((data: TPlayer[]) => {
    transformFields(data);
    return data;
  });
};

const transformFields = (data: TPlayer[] | any[]) => {
  for (let player of data) {
    if (player.dob) {
      player.dob = formatMillisecondsToDateString(player.dob);
    }
  }
};

export const getCricketPlayerById = (id : string) : Promise<TPlayer> => {
    return getPlayersData().then((data : TPlayer[]) => {
        const player = data.find((player) => player.id === id);
        transformFields([player]);
        return player as TPlayer;
    })
}