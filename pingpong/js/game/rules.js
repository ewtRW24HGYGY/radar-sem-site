// Official table tennis rules (ITTF, singles).
//  • Referee: turns physics contact events into point decisions (serve faults, lets, double
//    bounces, out balls, net, volleys/obstruction).
//  • MatchScore: games to 11 with a 2-point lead, service alternating every 2 points and every
//    point from 10–10, first server alternating between games, best of N games.
import { TABLE_HALF_W, TABLE_HALF_L } from '../physics/constants.js';

export const REASONS = {
  serveNoOwnBounce: 'Saque inválido: a bola deve quicar primeiro do seu lado',
  serveDoubleBounce: 'Saque inválido: a bola quicou duas vezes do lado do sacador',
  serveMissed: 'Saque perdido',
  serveNet: 'Saque na rede',
  serveOut: 'Saque para fora',
  out: 'Bola fora',
  net: 'Bola na rede',
  ownSide: 'A bola quicou do próprio lado',
  doubleBounce: 'Dois quiques',
  notReturned: 'Sem devolução',
  obstruction: 'Bola tocada antes de quicar (obstrução)',
  volleyOut: 'Bola rebatida fora da mesa antes de quicar',
  doubleHit: 'Toque duplo',
  stalled: 'Bola parada',
};

export class Referee {
  constructor() { this.listeners = []; this.reset(0); }
  onDecision(fn) { this.listeners.push(fn); }
  reset(server, strictToss = true) {
    this.server = server;
    this.phase = 'idle';           // idle | hold | tossed | serve | rally | over
    this.lastHitter = -1;
    this.bounces = [0, 0];         // bounces since the last hit, per side
    this.netOnServe = false;
    this.hits = 0;                 // strokes in the rally (serve included)
    this.strictToss = strictToss;
    this.lastEventTime = 0;
    this.lastHitTime = -1;
    this.netSinceHit = false;
  }
  startServe(server) { this.reset(server, this.strictToss); this.phase = 'hold'; }
  toss(t) { if (this.phase === 'hold') { this.phase = 'tossed'; this.lastEventTime = t; } }

  decide(winner, reason, extra = {}) {
    if (this.phase === 'over') return;
    this.phase = 'over';
    for (const fn of this.listeners) fn({ winner, reason, let: false, rally: this.hits, ...extra });
  }
  callLet(reason) {
    if (this.phase === 'over') return;
    this.phase = 'over';
    for (const fn of this.listeners) fn({ winner: -1, reason, let: true, rally: this.hits });
  }

  event(ev, ballPos) {
    if (this.phase === 'over' || this.phase === 'idle') return;
    this.lastEventTime = ev.time ?? this.lastEventTime;
    const S = this.server, Rv = 1 - S;
    switch (ev.type) {
      case 'paddle': {
        const p = ev.index;
        if (this.phase === 'hold') return;
        if (this.phase === 'tossed') {
          if (p !== S) { this.decide(S, REASONS.obstruction); return; }
          this.phase = 'serve'; this.lastHitter = S; this.bounces = [0, 0]; this.hits = 1; this.lastHitTime = ev.time;
          return;
        }
        if (p === this.lastHitter) {
          // the same racket touching again within a few ms is the same contact (rolling on the rubber)
          if (ev.time - this.lastHitTime < 0.03) return;
          if (this.bounces[0] + this.bounces[1] === 0) { this.decide(1 - p, REASONS.doubleHit); return; }
        }
        if (this.phase === 'serve' && this.bounces[S] === 0 && p === Rv) {
          // receiver touched the serve before it even bounced on the server's side
          this.decide(S, REASONS.obstruction); return;
        }
        if (this.bounces[p] === 0) {
          // volley: obstruction if the ball was above / heading to the playing surface
          const over = Math.abs(ballPos.x) <= TABLE_HALF_W && Math.abs(ballPos.z) <= TABLE_HALF_L;
          if (over) this.decide(1 - p, REASONS.obstruction);
          else this.decide(p, REASONS.volleyOut);
          return;
        }
        this.phase = 'rally'; this.lastHitter = p; this.bounces = [0, 0]; this.hits++; this.lastHitTime = ev.time;
        this.netSinceHit = false;
        return;
      }
      case 'table': {
        const side = ev.side;
        if (this.phase === 'hold') return;
        if (this.phase === 'tossed') { if (this.strictToss) this.decide(Rv, REASONS.serveMissed); else this.callLet('Lance o saque novamente'); return; }
        if (this.phase === 'serve') {
          if (this.bounces[S] === 0) {
            if (side !== S) { this.decide(Rv, REASONS.serveNoOwnBounce); return; }
            this.bounces[S] = 1; return;
          }
          if (side === S) { this.decide(Rv, this.bounces[Rv] ? REASONS.notReturned : REASONS.serveDoubleBounce); return; }
          // first bounce on the receiver's side
          if (this.netOnServe) { this.callLet('Let — o saque tocou a rede'); return; }
          this.bounces[Rv]++;
          if (this.bounces[Rv] >= 2) { this.decide(S, REASONS.notReturned); return; }
          this.lastHitter = S;  // the receiver must now play the ball
          return;
        }
        if (this.phase === 'rally') {
          const H = this.lastHitter, O = 1 - H;
          if (side === H) {
            if (this.bounces[O] === 0) this.decide(O, this.netSinceHit ? REASONS.net : REASONS.ownSide);
            else this.decide(H, REASONS.notReturned);
            return;
          }
          this.bounces[O]++;
          if (this.bounces[O] >= 2) this.decide(H, REASONS.doubleBounce);
        }
        return;
      }
      case 'net':
        this.netSinceHit = true;
        if (this.phase === 'serve' && this.bounces[S] >= 1 && this.bounces[Rv] === 0) this.netOnServe = true;
        return;
      case 'floor': case 'barrier': case 'tableSide': {
        if (this.phase === 'hold') return;
        if (this.phase === 'tossed') { if (this.strictToss) this.decide(Rv, REASONS.serveMissed); else this.callLet('Lance o saque novamente'); return; }
        if (this.phase === 'serve') {
          if (this.bounces[Rv] >= 1) this.decide(S, REASONS.notReturned);
          else if (this.bounces[S] === 0) this.decide(Rv, REASONS.serveOut);
          else this.decide(Rv, this.netOnServe ? REASONS.serveNet : REASONS.serveOut);
          return;
        }
        if (this.phase === 'rally') {
          const H = this.lastHitter, O = 1 - H;
          if (this.bounces[O] >= 1) this.decide(H, REASONS.notReturned);
          else this.decide(O, this.netSinceHit && ballPos && Math.abs(ballPos.z) < 0.6 ? REASONS.net : REASONS.out);
        }
      }
    }
  }

  // Ball came to rest on the table or got stuck (e.g. on top of the net)
  stalled(ballPos) {
    if (this.phase !== 'rally' && this.phase !== 'serve') return;
    const side = ballPos.z >= 0 ? 0 : 1;
    const H = this.lastHitter;
    if (this.phase === 'serve' && this.bounces[1 - this.server] === 0) { this.decide(1 - this.server, REASONS.stalled); return; }
    this.decide(side === H ? 1 - H : H, REASONS.stalled);
  }
}

export class MatchScore {
  constructor({ pointsToWin = 11, bestOf = 3, firstServer = 0 } = {}) {
    this.pointsToWin = pointsToWin;
    this.bestOf = bestOf;
    this.points = [0, 0];
    this.games = [0, 0];
    this.gameHistory = [];
    this.firstServerOfGame = firstServer;
    this.matchFirstServer = firstServer;
    this.over = false;
    this.winner = -1;
  }
  get server() {
    const total = this.points[0] + this.points[1];
    const deuce = this.points[0] >= this.pointsToWin - 1 && this.points[1] >= this.pointsToWin - 1;
    const turns = deuce ? (this.pointsToWin - 1) + (total - 2 * (this.pointsToWin - 1)) : Math.floor(total / 2);
    return (this.firstServerOfGame + turns) % 2;
  }
  gameWinner() {
    const [a, b] = this.points;
    if (a >= this.pointsToWin && a - b >= 2) return 0;
    if (b >= this.pointsToWin && b - a >= 2) return 1;
    return -1;
  }
  // Returns { gameWon: index|-1, matchWon: index|-1 }
  pointWon(i) {
    if (this.over) return { gameWon: -1, matchWon: this.winner };
    this.points[i]++;
    const g = this.gameWinner();
    let matchWon = -1;
    if (g >= 0) {
      this.games[g]++;
      this.gameHistory.push([...this.points]);
      if (this.games[g] > this.bestOf / 2) { this.over = true; this.winner = g; matchWon = g; }
      else {
        this.points = [0, 0];
        this.firstServerOfGame = 1 - this.firstServerOfGame;
      }
    }
    return { gameWon: g, matchWon };
  }
  isGamePoint() {
    const [a, b] = this.points, P = this.pointsToWin;
    return (a >= P - 1 && a - b >= 1) || (b >= P - 1 && b - a >= 1);
  }
  gamePointFor() {
    const [a, b] = this.points, P = this.pointsToWin;
    if (a >= P - 1 && a - b >= 1) return 0;
    if (b >= P - 1 && b - a >= 1) return 1;
    return -1;
  }
  isMatchPoint() {
    const g = this.gamePointFor();
    return g >= 0 && this.games[g] + 1 > this.bestOf / 2;
  }
}
