export interface Score {
  ru: number;
  shi: number;
  dao: number;
}

export function trackAnswer(tradition: 'ru' | 'shi' | 'dao', score: Score): void {
  score[tradition]++;
}

export function getPercentages(score: Score): { ru: number; shi: number; dao: number } {
  const total = score.ru + score.shi + score.dao;
  if (total === 0) {
    return { ru: 33, shi: 33, dao: 34 };
  }
  const ru = Math.round((score.ru / total) * 100);
  const shi = Math.round((score.shi / total) * 100);
  // Adjust dao to ensure the three sum to exactly 100
  const dao = 100 - ru - shi;
  return { ru, shi, dao };
}

export function getDominant(score: Score): 'ru' | 'shi' | 'dao' {
  if (score.ru >= score.shi && score.ru >= score.dao) return 'ru';
  if (score.shi >= score.ru && score.shi >= score.dao) return 'shi';
  return 'dao';
}

const interpretations: Record<string, string[]> = {
  ru: [
    '你是一位心怀天下的人。',
    '你相信秩序与责任的力量，认为人伦纲常、礼义廉耻是社会安定的根基。你重视家庭与传承，在困难面前总能保持担当。你内心深处有一种使命感——通过自己的努力让周围的世界变得更好。',
    '儒家的智慧在你身上体现为一种温暖而坚定的力量。你不逃避现实，而是积极投身其中，在人与人的关系中寻找意义，在责任与付出中实现自我。',
  ],
  shi: [
    '你有一颗澄明的心。',
    '你看透了世间万象的虚妄本质，不为名利所困，不为得失所扰。你深知痛苦的根源在于执念，而最大的自由来自内心的放下。你用慈悲对待他人，用静观对待世事。',
    '佛家的智慧在你身上体现为一种超越的宁静。你不急于改变外在，而是先安顿内心。在你的世界里，真正的富足不是拥有更多，而是不再需要更多。',
  ],
  dao: [
    '你是一个自由的灵魂。',
    '你顺应自然的节律，不被人为的规矩所束缚。你相信万事万物自有其道，最好的方式往往是不加干预。你追求的是一种自在的状态——如水般灵活，如风般自由，如草木般自然生长。',
    '道家的智慧在你身上体现为一种通透的洒脱。你不与人争，也不与自己较劲。在你的世界里，"无为"不是消极怠惰，而是一种高级的智慧——让该发生的自然发生。',
  ],
};

export function getInterpretation(dominant: 'ru' | 'shi' | 'dao', percentages: { ru: number; shi: number; dao: number }): string {
  const lines = interpretations[dominant] || [];
  const names: Record<string, string> = { ru: '儒家', shi: '佛家', dao: '道家' };
  const secondary = getSecondary(dominant, percentages);
  const extraLine = names[secondary]
    ? `\n\n你也带有${names[secondary]}的气质（${percentages[secondary]}%），这让你${
        secondary === 'ru' ? '在看透世事后依然保持对人间秩序的尊重' :
        secondary === 'shi' ? '在追求自由的同时不失一份内心的慈悲' :
        '在追求秩序的过程中保留了一份洒脱与灵动'
      }。`
    : '';
  return lines.join('\n\n') + extraLine;
}

function getSecondary(dominant: 'ru' | 'shi' | 'dao', percentages: { ru: number; shi: number; dao: number }): 'ru' | 'shi' | 'dao' {
  const entries = Object.entries(percentages) as Array<['ru' | 'shi' | 'dao', number]>;
  const sorted = entries.filter(([key]) => key !== dominant).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}
