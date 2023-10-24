import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCricketPlayerById } from "./CricketHelper";
import { TPlayer } from "../../Types/types";
import { formatMillisecondsToDateString } from "../../Helpers/dateHelper";

interface TPlayerExtended extends TPlayer{
  age : number
}

const CricketPlayerDetails = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [player, setPlayer] = useState<TPlayerExtended>();

  useEffect(() => {
    getCricketPlayerById(userId as string).then((player : any) => {
      setPlayer(player);
    });
  }, []);

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography fontWeight={"bold"} fontSize={"1rem"} component={"span"}>
          Go Back To Players List
        </Typography>
      </Box>
      <Box padding={"2rem"}>
        <Typography fontWeight={"bold"} fontSize={"1.5rem"} marginTop={"2rem"}>
          Player Details
        </Typography>
        <Grid container spacing={2} marginTop={"1rem"}>
          <Grid item xs={12}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              component={"span"}
            >
              Name :
            </Typography>
            <Typography fontSize={"1.2rem"} component={"span"}>
              {" "}
              {player?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              component={"span"}
            >
              Rank :
            </Typography>
            <Typography fontSize={"1.2rem"} component={"span"}>
              {" "}
              {player?.rank}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              component={"span"}
            >
              Type :
            </Typography>
            <Typography fontSize={"1.2rem"} component={"span"}>
              {" "}
              {player?.type}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              component={"span"}
            >
              Points :
            </Typography>
            <Typography fontSize={"1.2rem"} component={"span"}>
              {" "}
              {player?.points}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              component={"span"}
            >
              Age :
            </Typography>
            <Typography fontSize={"1.2rem"} component={"span"}>
              {" "}
              {player?.age}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              component={"span"}
            >
              Date of Birth :
            </Typography>
            <Typography fontSize={"1.2rem"} component={"span"}>
              {" "}
              {formatMillisecondsToDateString(player?.dob)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              component={"span"}
            >
              Description :
            </Typography>
            <Typography fontSize={"1.2rem"} component={"span"}>
              {" "}
              {player?.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CricketPlayerDetails;
