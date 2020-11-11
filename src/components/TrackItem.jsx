import { useState, useContext } from "react";
import styled from "styled-components";
import { getReadableDuration } from "../utils/time";
import { AppContext } from "../context";

import Link from "./Link";
import Img from "./Img";
import Icon from "./Icon";

const StyledTrackItem = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 10px 50px rgb(220 226 229 / 0.2);

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  .track {
    display: flex;
    position: relative;

    .track__thumbnail {
      > img {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
    }

    .track__meta {
      width: 100%;
      padding: 12px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-size: 14px;

      .track__name,
      .track__artists {
        display: block;
      }

      .track__name {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray.dark};
        position: relative;
        display: block;
        height: 18px;
        overflow: hidden;

        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 70px;
          height: 18px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0), #ffffff 50%);
        }
      }

      .track__artists {
        position: relative;
        height: 16px;
        overflow: hidden;

        &:not(:empty) {
          margin-top: 2px;
          font-size: 12px;
          color: ${({ theme }) => theme.colors.gray.light};
        }

        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 70px;
          height: 18px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0), #ffffff 50%);
        }
      }
    }

    .track__play {
      position: absolute;
      right: 12px;
      bottom: 12px;
      display: flex;

      audio {
        display: none;
      }

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        color: #ffffff;
        background-color: #0062ff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }

    .track__time {
      position: absolute;
      right: 12px;
      top: 12px;
      display: flex;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: -0.4px;
      color: ${({ theme }) => theme.colors.gray.light};
    }
  }
`;

const TrackItem = ({ data, children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  // TODO: refactor
  const { player, setPlayer } = useContext(AppContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const { track } = data;

  const handleClick = (event) => {
    event.preventDefault();

    const player = event.target.previousElementSibling;

    const start = (p) => {
      p.play();
      setIsPlaying(true);

      // 0 : arrêté
      // 1 : en lecture
      // 2 : en pause
      setPlayer({
        selector: p.id,
        state: 1,
      });
    };

    const stop = (p) => {
      p.pause();
      p.currentTime = 0;
      setIsPlaying(false);

      setPlayer({
        selector: p.id,
        state: 0,
      });
    };

    // if (playerState.playing && !playerState.player !== player.id) {
    //   const runningPlayer = document.getElementById(playerState.player);
    //   stop(runningPlayer);
    // }

    if (!isPlaying && player && player.nodeName === "AUDIO") {
      start(player);
      // playerDispatch({ type: "launch", player: player.id });
    }

    if (isPlaying && player && player.nodeName === "AUDIO") {
      stop(player);
      // playerDispatch({ type: "stop", player: player.id });
    }

    player.addEventListener("ended", stop);
  };

  return (
    <StyledTrackItem {...props}>
      <Link to={`/tracks/${track.id}`} className="track">
        <div className="track__thumbnail">
          <Img
            src={track.album.images[0].url}
            alt={track.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="track__meta">
          <span className="track__name">{track.name}</span>
          <span className="track__artists">
            {track.artists.map((artist) => artist.name).join(", ")}
          </span>
        </div>
        <div className="track__time">
          {getReadableDuration(track.duration_ms)}
        </div>
        {track.preview_url && (
          <div className="track__play">
            <audio controls src={track.preview_url} id={track.id}>
              Your browser does not support the element.
            </audio>
            <button onClick={handleClick}>
              {!isPlaying ? (
                <Icon name={"play"} width="24px"></Icon>
              ) : (
                <Icon name={"pause"} width="12px"></Icon>
              )}
            </button>
          </div>
        )}
      </Link>
    </StyledTrackItem>
  );
};

export default TrackItem;
