export interface Type {
  type1: string;
  type2: string;
  resistance: string[];
  weakness: string[];
}

export interface StageMod {
  name: string | null;
  amount: number | null;
  target: string | null;
}

export interface Condition {
  name: string | null;
  chance: number | null;
}

export interface Effects {
  name: string | null;
  chance: number | null;
}

export interface Move {
  name: string;
  power: number | null;
  type: string;
  accuracy: number;
  priority: number;
  stageMod: StageMod[];
  condition: Condition;
  effects: Effects;
  animationType: string;
  description: string;
  hitType: string;
  contact: boolean;
  pp: number;
}

export interface Stats {
  lvl: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttk: number;
  specialDef: number;
  speed: number;
}

export interface StageMods {
  attack: number;
  defense: number;
  specialAttk: number;
  specialDef: number;
  speed: number;
  evasion: number;
  accuracy: number;
}

export interface RefStats {
  lvl: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttk: number;
  specialDef: number;
  speed: number;
}

export interface Pokemon {
  name: string;
  type: Type;
  image: string;
  imageBack: string;
  condition: null;
  stats: Stats;
  stageMods: StageMods;
  refStats: RefStats;
  moves: Move[];
}
