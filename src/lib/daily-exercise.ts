import type { Exercise } from './types';
import exercises from '../data/exercises.json';

/**
 * Hashes a date string (YYYY-MM-DD) to a stable index into the exercise pool.
 * Uses a simple djb2-style hash so the same date always returns the same exercise
 * for every user on every reload.
 */
function hashDate(dateStr: string): number {
  let hash = 5381;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 33) ^ dateStr.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * Returns the exercise for a given date.
 * Same date → same exercise for everyone, every reload.
 * Different day → different exercise.
 *
 * @param date - Defaults to today. Pass a specific date for testing.
 */
export function getDailyExercise(date: Date = new Date()): Exercise {
  const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
  const pool = exercises as Exercise[];
  const index = hashDate(dateStr) % pool.length;
  return pool[index];
}
