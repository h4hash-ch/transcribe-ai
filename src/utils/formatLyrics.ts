export function formatLyrics(text: string): string {
  const words = text.split(" ").filter(Boolean);
  const lines: string[] = [];
  let line: string[] = [];

  words.forEach(w => {
    line.push(w);
    if (line.length >= 5 + Math.floor(Math.random() * 4)) {
      lines.push(line.join(" "));
      line = [];
    }
  });

  if (line.length) lines.push(line.join(" "));
  return lines.join("\n");
}