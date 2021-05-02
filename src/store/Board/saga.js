import { all, takeLatest, call, put } from "redux-saga/effects";
import { getToken } from "../../helpers/session";
import {
  SINGLE_HELP,
  GET_HINT_BEST_MOVES,
  GET_HINT_SHOW_BEST,
  GET_HINT_HEATMAP_FULL,
  MAP_HELP,
  GET_HINT_HEATMAP_ZONE,
  SCORES_WINNER,
  GET_SCORES_WINNER,

  GET_HINT_HEATMAP_ZONE_ENEMY,
  GET_HINT_SHOW_BEST_ENEMY,
  GET_HINT_BEST_MOVES_ENEMY,
  GET_HINT_WORST_MOVE_ENEMY
} from "./types";

import {
  helpBestMoves,
  helpBestMovesEnemy,
  helpShowBest,
  helpShowBestEnemy,
  helpHeatmapFull,
  helpHeatmapZone,
  helpHeatmapZoneEnemy,
  helpWorstMoveEnemy,
  scoresWinner
} from "../../api/board";

function* fetchGetHintBestMoves_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpBestMoves, getToken(), payload.game_id, payload.count);
    if (res.hint) {
      let newObj = {};
      res.hint.forEach((key, i) => {
        newObj[key.move] = i+1
      })
      yield put({ type: SINGLE_HELP, payload: newObj})
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetBestMovesEnemy_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpBestMovesEnemy, getToken(), payload.game_id, payload.count);
    if (res.hint) {
      let newObj = {};
      res.hint.forEach((key, i) => {
        newObj[key.move] = i+1
      })
      yield put({ type: SINGLE_HELP, payload: newObj})
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintWorstMoveEnemy_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpWorstMoveEnemy, getToken(), payload.game_id, payload.move);
    if (res.hint) {
      const newObj = {}
      newObj[res.hint] = 'circle'
      yield put({ type: SINGLE_HELP, payload: newObj})
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchGetHintShowBest_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpShowBest, getToken(), payload.game_id, payload.moves);
    if (res.hint) {
      const newObj = {}
      newObj[res.hint] = 'circle'
      yield put({ type: SINGLE_HELP, payload: newObj})
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintShowBestEnemy_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpShowBestEnemy, getToken(), payload.game_id, payload.moves);
    if (res.hint) {
      const newObj = {}
      newObj[res.hint] = 'circle'
      yield put({ type: SINGLE_HELP, payload: newObj})
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapFull_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpHeatmapFull, getToken(), payload.game_id);
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: res.hint})
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapZone_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpHeatmapZone, getToken(), payload.game_id, payload.isQuarter);
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: { zone: res.hint, isQuarter: payload.isQuarter, player: 'main'}})
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapZoneEnemy_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpHeatmapZoneEnemy, getToken(), payload.game_id, payload.isQuarter);
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: { zone: res.hint, isQuarter: payload.isQuarter, player: 'enemy'}})
    }
  } catch (e) {
    //throw e;
  }
}


function* fetchGetHintScoresWinner_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(scoresWinner, getToken(), payload.game_id);
    if (res.hint) {
      yield put({ type: SCORES_WINNER, payload: res.hint})
    }
  } catch (e) {
    //throw e;
  }
}

export function* boardSaga() {
  yield all([
    takeLatest(GET_HINT_BEST_MOVES, fetchGetHintBestMoves_saga),
    takeLatest(GET_HINT_BEST_MOVES_ENEMY, fetchGetBestMovesEnemy_saga),
    takeLatest(GET_HINT_SHOW_BEST, fetchGetHintShowBest_saga),
    takeLatest(GET_HINT_SHOW_BEST_ENEMY, fetchGetHintShowBestEnemy_saga),
    takeLatest(GET_HINT_HEATMAP_FULL, fetchGetHintHeatmapFull_saga),
    takeLatest(GET_HINT_HEATMAP_ZONE, fetchGetHintHeatmapZone_saga),
    takeLatest(GET_HINT_HEATMAP_ZONE_ENEMY, fetchGetHintHeatmapZoneEnemy_saga),
    takeLatest(GET_HINT_WORST_MOVE_ENEMY, fetchGetHintWorstMoveEnemy_saga),
    takeLatest(GET_SCORES_WINNER, fetchGetHintScoresWinner_saga),

  ]);
}
