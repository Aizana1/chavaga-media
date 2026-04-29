export interface BilingualText {
  rus: string;
  tuv: string;
}

export interface Article {
  id: string;
  rubricSlug: string;
  title: BilingualText;
  date?: BilingualText;
  image?: string;
  body: BilingualText; // абзацы разделяются \n\n
}
