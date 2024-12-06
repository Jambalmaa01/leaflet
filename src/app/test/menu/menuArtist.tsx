'use client';
import React from 'react';
import { ArtistMenu } from '../artistMenu';
import { useState } from 'react';
import { Typography, Box, List } from '@mui/material';
import { ArtistMenuList } from '../artirtMenuList';
import { artistMenu } from '../artistMenu';

export function MenuArtist() {
  const [expandedItems, setExpandedItems] = useState(false);
  return (
    <Box sx={{ width: '50%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Typography>Artist</Typography>
      <ArtistMenuList item={artistMenu} />
    </Box>
  );
}
