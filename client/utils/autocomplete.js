import triggers from './triggers.json';

// Score how close a pattern is to a given string.
export const fuzzyScore = (pattern, str) => {
  const adjacencyBonus = 15;
  const separatorBonus = 10;
  const camelBonus = 10;
  const leadingLetterPenalty = -3;
  const maxLeadingLetterPenalty = -9;
  const unmatchedLetterPenalty = -1;

  const patternLength = pattern.length;
  const strLength = str.length;
  let patternIdx = 0;
  let strIdx = 0;
  let score = 0;
  let prevMatched = false;
  let prevLower = false;
  let prevSeparator = true;

  const matchedIndices = [];
  let bestLetter;
  let bestLower;
  let bestLetterIdx;
  let bestLetterScore = 0;
  let formattedStr = '';
  let lastIdx = 0;

  while (strIdx !== strLength) {
    const patternChar = patternIdx !== patternLength ? pattern.charAt(patternIdx) : null;
    const strChar = str.charAt(strIdx);

    const patternLower = patternChar !== null ? patternChar.toLowerCase() : null;
    const strLower = strChar.toLowerCase();
    const strUpper = strChar.toUpperCase();

    const nextMatch = patternChar && patternLower === strLower;
    const rematch = bestLetter && bestLower === strLower;

    const advanced = nextMatch && bestLetter;
    const patternRepeat = bestLetter && patternChar && bestLower === patternLower;

    if (advanced || patternRepeat) {
      score += bestLetterScore;
      matchedIndices.push(bestLetterIdx);
      bestLetter = null;
      bestLower = null;
      bestLetterIdx = null;
      bestLetterScore = 0;
    }

    if (nextMatch || rematch) {
      let newScore = 0;

      if (patternIdx === 0) {
        const penalty = Math.max(strIdx * leadingLetterPenalty, maxLeadingLetterPenalty);
        score += penalty;
      }

      if (prevMatched) {
        newScore += adjacencyBonus;
      }

      if (prevSeparator) {
        newScore += separatorBonus;
      }

      if (prevLower && strChar === strUpper && strLower !== strUpper) {
        newScore += camelBonus;
      }

      if (nextMatch) {
        patternIdx += 1;
      }

      if (newScore >= bestLetterScore) {
        if (bestLetter !== null) {
          score += unmatchedLetterPenalty;
        }

        bestLetter = strChar;
        bestLower = bestLetter.toLowerCase();
        bestLetterIdx = strIdx;
        bestLetterScore = newScore;
      }

      prevMatched = true;
    } else {
      formattedStr += strChar;

      score += unmatchedLetterPenalty;
      prevMatched = false;
    }

    prevLower = strChar === strLower && strLower !== strUpper;
    prevSeparator = strChar === '-' || strChar === ' ';

    strIdx += 1;
  }

  if (bestLetter) {
    score += bestLetterScore;
    matchedIndices.push(bestLetterIdx);
  }

  matchedIndices.forEach((idx) => {
    formattedStr += `${str.substr(lastIdx, idx - lastIdx)}<b>${str.charAt(idx)}<b>`;
    lastIdx = idx + 1;
  });

  formattedStr += str.substr(lastIdx, str.length - lastIdx);

  const matched = patternIdx === patternLength;
  return { matched, score, formattedStr, str };
};

// Return an array of suggestions based on a given query.
export const getSuggestions = (query) => {
  const value = query.trim().toLowerCase();

  if (value.length === 0) {
    return [];
  }

  let suggestions = triggers
    .map(trigger => ({ trigger, score: fuzzyScore(value, trigger.key) }))
    .filter(({ score }) => score.matched)
    .sort((a, b) => b.score.score - a.score.score)
    .map(({ trigger }) => trigger);

  if (suggestions.length > 10) {
    suggestions = suggestions.slice(0, 10);
  }

  return suggestions;
};

export const randomTrigger = () => {
  const i = Math.floor(Math.random() * triggers.length);
  return triggers[i];
};
