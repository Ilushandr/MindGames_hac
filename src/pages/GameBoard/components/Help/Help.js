import React from "react";
import styled from "styled-components";
import Players from "../GameInfo/components/Players/Players";
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
} from "./types";

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
`;

const HelpWrapper = styled.div`
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const HelpItem = styled.div`
  width: 48%;
  margin-bottom: 10px;
  background: ${(props) => (props.active ? "#D8AD63" : "#f6f6f6")};
  padding: 10px;
  cursor: pointer;
`;

const InactiveHelpItem = styled.div`
  width: 48%;
  margin-bottom: 10px;
  background: #a6a6a6;
  padding: 10px;
`;

const Help = ({
    enemyPass,
    stepColor,
    yourColor,
    you,
    opponent,
    stepMain,
    stepTwo,
    handleHelp,
    activeHelpId,
    scores,
    times,
    turns
  }) => {
    let best_quart;
    let best_quart_enemy;
    let best_move_enemy;
    let best_move;

  if (stepMain < 1){
    best_quart = <InactiveHelpItem>В какой четверти находится лучший ход?</InactiveHelpItem>;
    best_quart_enemy = <InactiveHelpItem>В какой четверти доски сейчас лучший ход врага?</InactiveHelpItem>;
    best_move_enemy = <InactiveHelpItem>Лучший ход противника</InactiveHelpItem>;
  } else if (stepMain < 10){
    best_quart = <HelpItem
      active={activeHelpId === HEATMAP_ZONE_QUARTER}
      onClick={() =>
        scores && handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER })
      }
    >
      В какой четверти доски сейчас лучший ход?
    </HelpItem>;

    best_quart_enemy = <HelpItem
      active={activeHelpId === 17}
      onClick={() =>
        scores && handleHelp({ type: "map", id: 17 })
      }
    >
      В какой четверти доски сейчас лучший ход врага?
    </HelpItem>

    best_move_enemy = <HelpItem
      active={activeHelpId === 5}
      onClick={() =>
        scores && handleHelp({ type: "single", id: 5, count: 1 })
      }
    >
      Лучший ход врага
    </HelpItem>

    best_move = <HelpItem
      active={activeHelpId === 1}
      onClick={() =>
        scores && handleHelp({ type: "single", id: 1, count: 1 })
      }
    >
      Лучший ход
    </HelpItem>


  }
  return (
    <Wrapper>
      <Players
        enemyPass={enemyPass}
        opponent={opponent}
        you={you}
        stepColor={stepColor}
        yourColor={yourColor}
        stepMain={stepMain}
        stepTwo={stepTwo}
        times={times}
      />
      <HelpWrapper>
        {best_quart}
        {best_quart_enemy}
        {best_move_enemy}
        {best_move}
        <HelpItem
          active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "score", id: 34 })}
        >
          Кто побеждает на данный момент?
        </HelpItem>
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;
