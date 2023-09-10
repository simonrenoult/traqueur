import styles from './page.module.css'

type Dictionary = { [key: string]: string };

const icons: Dictionary = {
  book: "📗",
  movie: "🍿",
  tvshow: "🛋️"
}

type ItemType = "movie" | "tvshow" | "book";

interface IListItem {
  id: string
  name: string
  type: ItemType
  score: Number
  endedAt: Date
}

function ListItem({item}: { item: IListItem }) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return <div className={styles.row}>
    <div className={styles.cell4}>{icons[item.type]}</div>
    <div className={styles.cell1}><a
      href={"https://www.allocine.fr/rechercher/?q=" + item.name}
      target="_blank"
      rel="noopener noreferrer"
    >{item.name}</a></div>
    <div className={styles.cell1}>{item.score.toString()}</div>
    <div className={styles.cell2}>{new Intl.DateTimeFormat("fr-FR", options).format(item.endedAt)}</div>
  </div>;
}

function List({items}: { items: IListItem[] }) {
  return (
    <div className={styles.list}>
      <div className={styles.row}>
        <div className={styles.cell4}><div>Type</div><div>⛛</div></div>
        <div className={styles.cell1}><div>Name</div><div>⛛</div></div>
        <div className={styles.cell1}><div>Score</div><div>⛛</div></div>
        <div className={styles.cell2}><div>Date</div><div>⛛</div></div>
      </div>
      {
        items.map(i =>
          <ListItem key={i.id} item={i}></ListItem>
        )
      }
    </div>
  );
}

export default function Page() {
  const items = someItems();
  return (
    <main className={styles.main}>
      <List items={items}></List>
    </main>
  )
}

function someItems() {
  const itemTypes: ItemType[] = ["movie", "book", "tvshow"]

  const items: IListItem[] = [
    {id: "1", type: "movie", name: "Interstellar", score: 20, endedAt: new Date()},
    {id: "2", type: "movie", name: "Mononoke Princess", score: 19, endedAt: new Date()},
    {id: "3", type: "movie", name: "Le premier jour du reste de ta vie", score: 18, endedAt: new Date()},
    ...Array.from({length: 20}, (item, i) => ({
      id: anItemKey(), type: itemTypes[i % itemTypes.length], name: aMovieName(), score: getRandomInt(0, 21), endedAt: new Date()
    }))
  ]
  return items;
}

function aMovieName(): string {
  const firstWord = aWord()
  return firstWord.slice(0, 1).toUpperCase() + firstWord.slice(1) + " " + aWord()
}

function anItemKey(): string {
  return randomWord(10, 10)
}

function aWord(): string {
  return randomWord(2, 7)
}

function randomWord(min: number, max: number): string {
  const vowels = ["a", "e", "i", "o", "u", "y"]
  const consonants = ["b", "c", "d", "f", "g", "g", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"]

  const length = Math.random() * (max - min) + min

  let word = ""
  for (let i = 0; i < length; i++) {
    if (i % 2 == 0) {
      const index = getRandomInt(0, consonants.length)
      word += consonants[index]
    } else {
      const index = getRandomInt(0, vowels.length)
      word += vowels[index]
    }
  }
  return word
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
