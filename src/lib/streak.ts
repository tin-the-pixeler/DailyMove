/**
 * Calculates the current consecutive-day streak from a list of completed dates.
 * A streak counts backwards from today. If today is not completed, we still
 * count if yesterday was completed (streak still alive until end of today).
 */
export function calcStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const dateSet = new Set(completedDates);
  const today = new Date();
  let streak = 0;

  // Start from today, walk backwards
  const cursor = new Date(today);
  cursor.setHours(0, 0, 0, 0);

  while (true) {
    const dateStr = cursor.toISOString().slice(0, 10);
    if (dateSet.has(dateStr)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      // If today isn't completed yet, check yesterday before breaking
      if (streak === 0) {
        cursor.setDate(cursor.getDate() - 1);
        const yesterday = cursor.toISOString().slice(0, 10);
        if (dateSet.has(yesterday)) {
          streak++;
          cursor.setDate(cursor.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }

  return streak;
}

/**
 * Returns the Mon–Sun dates for the ISO week containing the given date.
 */
export function getWeekDates(date: Date = new Date()): string[] {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 = Sun
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(monday);
    dd.setDate(monday.getDate() + i);
    return dd.toISOString().slice(0, 10);
  });
}
