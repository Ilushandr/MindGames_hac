import React from "react";
import styled from "styled-components";
import Players from "../GameInfo/components/Players/Players";
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
} from "./types";
import {Accordion, Card, Button} from "react-bootstrap"

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
    let heatmap;
    let best_of_3;
    let worst_move_enemy;
    let three_best_moves;
    let three_best_moves_enemy;

    best_quart = <InactiveHelpItem>В какой четверти находится лучший ход?</InactiveHelpItem>;
    best_quart_enemy = <InactiveHelpItem>В какой четверти доски сейчас лучший ход врага?</InactiveHelpItem>;
    best_move_enemy = <InactiveHelpItem>Лучший ход противника</InactiveHelpItem>;
    best_move = <InactiveHelpItem>Лучший ход</InactiveHelpItem>;
    heatmap = <InactiveHelpItem>Тепловая карта</InactiveHelpItem>;
    best_of_3 = <InactiveHelpItem>Показать лучший из заданных 3 ходов</InactiveHelpItem>;
    worst_move_enemy = <InactiveHelpItem>Худший ход противника</InactiveHelpItem>;
    three_best_moves = <InactiveHelpItem>3 Лучших хода</InactiveHelpItem>;
    three_best_moves_enemy = <InactiveHelpItem>3 Лучших хода противника</InactiveHelpItem>;


  if (stepMain < 1){

  } else if (stepMain < 7){
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
  } else if (stepMain < 45){
    heatmap = <HelpItem
      active={activeHelpId === HEATMAP_FULL}
      onClick={() =>
        scores && handleHelp({ type: "map", id: HEATMAP_FULL })
      }
    >
      Тепловая карта
    </HelpItem>;

    best_of_3 = <HelpItem
      active={activeHelpId === 16}
      onClick={() =>
        scores &&
        handleHelp({ type: "multiple", multipleHandleCount: 4, id: 16 })
      }
      >
        Показать лучший из заданных 3 ходов
      </HelpItem>

      worst_move_enemy = <HelpItem
        active={activeHelpId === 12}
        onClick={() =>
          scores && handleHelp({ type: "single", id: 12, move: true })
        }
      >
        Худший ход врага
      </HelpItem>
  } else {
    three_best_moves = <HelpItem
      active={activeHelpId === 1}
      onClick={() =>
        scores && handleHelp({ type: "single", id: 1, count: 3 })
      }
    >
      3 Лучших хода
    </HelpItem>
    three_best_moves_enemy = <HelpItem
      active={activeHelpId === 5}
      onClick={() =>
        scores && handleHelp({ type: "single", id: 5, count: 3 })
      }
    >
      3 Лучших хода противника
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
      <div style={{width: "100%"}}>
        <HelpItem
          active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "score", id: 34 })}
        >
          Кто побеждает на данный момент?
        </HelpItem>
        </div>
      <Accordion defaultActiveKey="1">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h3>I Этап (<em>Фусэки</em>)</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div style={{width: "100%"}}>
                {best_quart}
                {best_quart_enemy}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <h3>II Этап (<em>Тюбан</em>)</h3>

          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <div style={{width: "100%"}}>
                {heatmap}
                {best_of_3}
                {worst_move_enemy}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <h3>III Этап (<em>Ёсэ</em>)</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <div style={{width: "100%"}}>
                {three_best_moves}
                {three_best_moves_enemy}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;
