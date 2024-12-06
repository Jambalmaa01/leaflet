import { MuiIconType } from '../test/menu/MuiIconType';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaceIcon from '@mui/icons-material/Place';

export type ArtistMenu = {
  name: string;
  icon: MuiIconType;
  divider?: boolean;
} & (
  | {
      href: string;
    }
  | {
      children: ArtistMenu[];
    }
);
export const artistMenu: ArtistMenu[] = [
  {
    name: 'test',
    icon: MilitaryTechOutlinedIcon,
    href: './artist',
  },
  {
    name: 'test',
    icon: PeopleAltOutlinedIcon,
    href: './artist',
  },
  {
    name: 'test',
    icon: ControlCameraOutlinedIcon,
    children: [
      {
        name: 'test',
        icon: EditNoteIcon,
        href: './artist',
      },
      {
        name: 'test',
        icon: PlaceIcon,
        href: './artist',
        children: [
          {
            name: 'mnw',
            icon: EditNoteIcon,
            href: './artist',
          },
        ],
      },
    ],
  },
];
