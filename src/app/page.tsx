'use client';

// import Map from './component/map';
// import Map from './leaflet/page';
import Map from './leaflet2/page';
import { Leaflet } from './leaflet1';
import dynamic from 'next/dynamic';
import './page.module.css';
import { ArtistMenuList } from './test';
import { MenuArtist } from './test/menu';
import {CategoryAddForm} from '../components/screens/category/CategoryScreen'
import { AuthSignInScreen } from '@/components/screens/auth-sign-in';
import { LeafletLineComponenet } from './leaflet1/test/leafletLine';
const LeafletComponenet1 = dynamic(
  () =>
    import('./leaflet1/leafletComponenet1').then(
      (res) => res.LeafletComponenet1
    ),
  { ssr: false }
);

   export default function Home() {
  return (
    <>
      <LeafletLineComponenet />
    </>
  );
}
