import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HighScore {
    score: bigint;
    timestamp: bigint;
}
export interface backendInterface {
    getAllHighScores(): Promise<Array<[Principal, HighScore]>>;
    getHighScore(): Promise<bigint>;
    setHighScore(score: bigint, timestamp: bigint): Promise<void>;
}
