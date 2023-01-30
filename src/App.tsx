import {FormEvent, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
            <AlbumPicker />
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

function AlbumPicker() {
    const [albums, setAlbums] = useState<string[]>([]);
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            artist: { value: string };
        };
        const artist = encodeURIComponent(target.artist.value);
        const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=artist:${artist}`;
        const response = await fetch(url);
        const mbResult = (await response.json()) as {
            releases: { title: string }[];
        };
        const { releases } = mbResult;
        setAlbums(releases.map(({ title }) => title));
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Artist name:
                <input name="artist" />
            </label>
            <button type="submit">Search</button>
            <p>Albums:</p>
            <ol>
                {albums.map((album) => (
                    <li>{album}</li>
                ))}
                {albums.map((date) => (
                    <li>{date}</li>
                ))}
            </ol>
        </form>
    );
}

export default App
