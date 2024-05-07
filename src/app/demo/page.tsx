import Link from 'next/link';

export default function Demo() {
  return (<main className="flex text-9xl min-h-screen flex-col items-center justify-between p-24">
            <iframe
                width="640"
                height="480"
                src="https://sketchfab.com/playlists/embed?collection=8164993e17d246d69b6321f44cb17e96&autostart=0"
                title="witch"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
            ></iframe>
            <p style={{
              'fontFamily': 'sans-serif',
              'fontSize': '13px',
              'fontWeight': 'normal',
              'margin': '5px',
              'color': '#4A4A4A',
            }}>
                <Link href="https://sketchfab.com/thuyvietquoc/collections/witch-8164993e17d246d69b6321f44cb17e96"
                      target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>witch
                </Link>
                by
                <Link href="https://sketchfab.com/thuyvietquoc" target="_blank" rel="nofollow"
                      style={{ fontWeight: 'bold', color: '#1CAAD9' }}>thuyvietquoc
                </Link>
                on
                <Link href="https://sketchfab.com?utm_source=website&utm_medium=embed&utm_campaign=share-popup"
                      target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>Sketchfab
                </Link>
            </p></main>);
}