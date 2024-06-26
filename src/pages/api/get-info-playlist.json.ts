import { allPlaylists, songs } from "../../lib/data";

export async function GET(id: string): Promise<Response> {
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid id parameter" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const playlist = allPlaylists.find(({ id: playlistId }) => playlistId === id);
  const allSongs = songs.filter(({ albumId }) => albumId === playlist?.albumId);

  return new Response(JSON.stringify({ playlist, allSongs }), {
    headers: { "content-type": "application/json" },
  });
}
