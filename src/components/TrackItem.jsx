import { useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";
import { getReadableDuration } from "../utils/time";

import Link from "./Link";
import Img from "./Img";
import Icon from "./Icon";
import Button from "./Button";

const StyledTrackItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  .track {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 10px 50px rgb(220 226 229 / 0.2);
    display: flex;
    position: relative;

    .track__thumbnail {
      position: relative;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;

      > img {
        width: 80px;
        height: 80px;
        object-fit: cover;
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
        font-size: 15px;
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
          font-size: 13px;
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
        position: relative;
        padding: 0;
        border: none;
        color: #ffffff;
        background-color: ${({ theme }) => theme.colors.primary.base};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        outline: none;
      }

      &--unavailable {
        > button {
          background-color: #dce1e6;
          cursor: not-allowed;
          pointer-events: none;
        }
      }
    }

    .track__time {
      position: absolute;
      right: 12px;
      top: 12px;
      display: flex;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: -0.4px;
      color: ${({ theme }) => theme.colors.gray.light};
      z-index: 1020;
    }

    &--single {
      display: block;
      box-shadow: none;
      background-color: transparent;
      position: relative;
      z-index: 100;

      .track__thumbnail {
        border-radius: 8px;

        > img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        &:after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: block;
          background-image: linear-gradient(
            0,
            #030e2d,
            transparent 50%,
            transparent
          );
          border-radius: 8px;
          z-index: 1000;
        }
      }

      .track__meta {
        padding: 0;

        .track__name {
          margin-top: 38px;
          font-size: 18px;
          height: 22px;
        }
      }

      .track__play {
        right: 12px;
        bottom: 60px;
        z-index: 1070;

        > button {
          pointer-events: all;

          width: 48px;
          height: 48px;

          > svg {
            &.play {
              width: 48px;
            }

            &.pause {
              width: 22px;
            }
          }
        }
      }

      .track__time {
        font-size: 14px;
        color: #ffffff;
        left: 10px;
        bottom: 90px;
        top: unset;
      }

      .track__name,
      .track__artists {
        &:after {
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            #f7fafc 50%
          ) !important;
          width: 90px !important;
          height: 20px !important;
        }
      }

      .track__favorite {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 22px;
        height: 48px;
        padding: 0;
        margin: 0;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.gray.light};
        justify-content: flex-end;

        > svg {
          width: 20px;
        }

        &--added {
          > svg {
            fill: currentColor;
          }
        }
      }
    }
  }
`;

const TrackItemInner = ({ children, track, layout, ...props }) => {
  return (
    <>
      {layout === "single" ? (
        <div {...props}>{children}</div>
      ) : (
        <Link to={`/tracks/${track.id}`} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

const TrackItem = ({ data, children, className, layout, ...props }) => {
  const { player, setPlayer, handleTrackFavorite, inFavorites } = useContext(
    AppContext
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const { search } = data;
  const track = !search ? data.track : data;
  const isSingle = layout === "single";

  const handleClick = (event) => {
    event.preventDefault();

    const targetPlayer = event.target.previousElementSibling;

    if (!targetPlayer) {
      return;
    }

    const start = (element) => {
      let playerElement = element;

      if (!(element instanceof HTMLElement)) {
        playerElement = element.target;
      }

      playerElement.play();

      // 0 : stopped, 1 : playing, 2 : paused
      setPlayer({
        selector: playerElement.id,
        state: 1,
      });

      setIsPlaying(true);
    };

    const stop = (element) => {
      let playerElement = element;

      if (!(element instanceof HTMLElement)) {
        playerElement = element.target;
      }

      playerElement.pause();
      playerElement.currentTime = 0;

      // 0 : stopped, 1 : playing, 2 : paused
      setPlayer({
        selector: playerElement.id,
        state: 0,
      });

      setIsPlaying(false);
    };

    if (player.selector !== targetPlayer.id) {
      setIsPlaying(false);
      const runningPlayer = document.getElementById(player.selector);
      runningPlayer && stop(runningPlayer);
      start(targetPlayer);
    } else if (isPlaying && player.selector === targetPlayer.id) {
      stop(targetPlayer);
    } else {
      start(targetPlayer);
    }

    targetPlayer.addEventListener("ended", stop);
  };

  return (
    <StyledTrackItem {...props}>
      <TrackItemInner
        className={`track ${isSingle ? "track--single" : ""}`}
        layout={layout}
        track={track}
      >
        <div className="track__thumbnail">
          <Img src={track.album.images[0].url} alt={track.name} />
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
        {isSingle && (
          <Button
            onClick={() => {
              handleTrackFavorite(track);
            }}
            className={`track__favorite ${
              inFavorites(track) ? "track__favorite--added" : ""
            }`}
          >
            <Icon name={"heart"} width="24px"></Icon>
          </Button>
        )}
        {track.preview_url ? (
          <div className="track__play">
            <audio controls src={track.preview_url} id={track.id}>
              Your browser does not support the element.
            </audio>
            <button onClick={handleClick}>
              {!isPlaying || player.selector !== track.id ? (
                <Icon name={"play"} width="24px"></Icon>
              ) : (
                <Icon name={"pause"} width="12px"></Icon>
              )}
            </button>
          </div>
        ) : (
          <div className="track__play track__play--unavailable">
            <button>
              <Icon name={"play"} width="24px"></Icon>
            </button>
          </div>
        )}
      </TrackItemInner>
    </StyledTrackItem>
  );
};

export default TrackItem;
