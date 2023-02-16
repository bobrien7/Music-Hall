import requests
import time
import json

token = ''

class Song:
  def __init__(self, uri, disc_number, duration, explicit):
    self.uri = uri.replace("spotify:track:","")
    self.disc_number = disc_number
    self.duration = duration
    self.explicit = explicit

    def __str__(self):
        return self.uri

number_of_artists_to_download = 500
artist_list = []

with open("cleaned.csv", mode='r') as cleaned:
    for count, row in enumerate(cleaned):
        if count == 0:
            continue
        print(row.split(',')[0])
        artist_list.append(row.split(',')[0])
        if count == number_of_artists_to_download:
            break

artist_ids = []

for index, artist in enumerate(artist_list):
    try:
        print(index)
        response = requests.get(f'https://api.spotify.com/v1/search?q={artist}&type=artist&limit=3', headers={'Authorization': f'Bearer {token}'})
        start = time.time()
        json_data = response.json()
        artist_ids.append(json_data['artists']['items'][0]['id'])
        end = time.time()
        if (end - start) < 0.16:
            time.sleep(.16-(end-start))
    except:
        print("Error")
        print(json_data)
        token = input("Token expired. Enter new access token\n")

print("Total Artists:", len(artist_ids))

albums = []

for index, artist in enumerate(artist_ids):
    try:
        print(index)
        response = requests.get(f'https://api.spotify.com/v1/artists/{artist}/albums?limit=10', headers={'Authorization': f'Bearer {token}'})
        start = time.time()
        json_data = response.json()
        #albums.append(json_data['items'][0]['id'])
        for album in json_data['items']:
            albums.append(album['id'])
        end = time.time()
        if (end - start) < 0.16:
            time.sleep(.16-(end-start))
    except:
        print("Error")
        print(json_data)
        token = input("Token expired. Enter new access token\n")

print("Total Albums:", len(albums))

songs = []

for index, album in enumerate(albums):
    try:
        print(index)
        response = requests.get(f'https://api.spotify.com/v1/albums/{album}/tracks?limit=50', headers={'Authorization': f'Bearer {token}'})
        start = time.time()
        json_data = response.json()
        for track in json_data['items']:
            songs.append(Song(track['uri'], track['disc_number'], track['duration_ms'], track['explicit']))
        end = time.time()
        if (end - start) < 0.16:
            time.sleep(.16-(end-start))
    except:
        print("Error")
        print(json_data)
        token = input("Token expired. Enter new access token\n")

print("Total Tracks:", len(songs))

with open('tracks.json', 'w') as f:
    total_tracks_written = 0
    start = 0
    end = len(songs)
    step = 50
    for i in range(start, end, step):
        x = i
        song_id_list = ",".join(str(song.uri) for song in songs[x:x+step])
        print(x+step)
        start = time.time()
        response = requests.get(f'https://api.spotify.com/v1/tracks?ids={song_id_list}', headers={'Authorization': f'Bearer {token}'})
        start = time.time()
        json_data = response.json()
        try:
            for track in json_data["tracks"]:
                json.dump(track, f)
                f.write("\n")
                total_tracks_written+=1
            end = time.time()
            if (end - start) < 0.16:
                time.sleep(.16-(end-start))
            if total_tracks_written % 1000 == 0:
                print("Tracks dumped to file:", total_tracks_written)
        except:
            print("Error")
            print(json_data)
            token = input("Token expired. Enter new access token\n")

