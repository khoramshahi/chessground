/// <reference path="./dts/anim.d.ts" />
/// <reference path="./dts/chess.d.ts" />
/// <reference path="./dts/drawable.d.ts" />

import { Api, start } from './api'
import { Config, configure } from './config'
import { State, defaults } from './state'

import renderWrap from './wrap';
import bindEvents from './events'
import render from './render';
import * as util from './util';

export function Chessground(container: HTMLElement, config?: Config): Api {

  const bounds = container.getBoundingClientRect();

  const state = defaults() as State;

  configure(state, config || {});

  state.browser = {
    transformProp: util.computeTransformProp(),
    isTrident: util.computeIsTrident()
  };

  const [wrapEl, boardEl, overEl] = renderWrap(state, bounds);
  container.innerHTML = '';
  container.appendChild(wrapEl);

  state.dom = {
    boardEl: boardEl,
    overEl: overEl,
    bounds: bounds,
    redraw() { render(state); }
  };

  render(state);

  const api = start(state);

  bindEvents(state);

  return api;
};