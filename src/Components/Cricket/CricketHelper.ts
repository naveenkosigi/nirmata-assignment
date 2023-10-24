import { TMayBe, TPlayer, TPlayerType } from "../../Types/types";
import getPlayersData from "../../Store/get-players";
import { formatMillisecondsToDateString, getAge } from "../../Helpers/dateHelper";

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
      player.age = getAge(player.dob);
    }
    if(player.type){
        player.type = player.type.charAt(0).toUpperCase() + player.type.slice(1)
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

export const getCricketPlayerByName = (name : string) : Promise<TPlayer[] | undefined> => {
  return getPlayersData().then((data : TPlayer[]) => {
    transformFields(data);
    return data.filter((player) => player.name!.toLowerCase().indexOf(name.toLowerCase()) > -1);
  })
} 