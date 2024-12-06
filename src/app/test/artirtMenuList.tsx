'use client';

import { Fragment, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { artistDrawerExpandedArom } from './artistDrawerExpandedATom';
import Link from 'next/link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArtistMenu } from './artistMenu';
export type ArtistMenuListProps = {
  item?: ArtistMenu[];
  depth?: number;
  parentKey?: string;
};

export const ArtistMenuList = (props: ArtistMenuListProps) => {
  const { item = [], depth = 0, parentKey = '' } = props;
  const pathname = usePathname();
  // const [expandedItems, setExpandedItems] = useState(artistDrawerExpandedArom);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const expandParent = (
      item: ArtistMenu[],
      currentPath: string,
      parentKey: string = ''
    ) => {
      let shouldExpand = false;
      item.forEach((item) => {
        if ('children' in item && item.children.length > 0) {
          const isChildSelected = item.children.some(
            (child) => 'href' in child && currentPath.startsWith(child.href)
          );
          if (isChildSelected) {
            setExpandedItems((prevState) => ({
              ...prevState,
              [parentKey]: true,
            }));
            shouldExpand = true;
          }
          const childShouldExpand = expandParent(
            item.children,
            currentPath,
            `${parentKey}-${item.name}`
          );
          if (childShouldExpand) {
            setExpandedItems((prevState) => ({
              ...prevState,
              [`${parentKey}-${item.name}`]: true,
            }));
            shouldExpand = true;
          }
        } else if ('href' in item && item.href === currentPath) {
          shouldExpand = true;
        }
      });
      return shouldExpand;
    };
    expandParent(item, decodeURI(pathname));
  }, [pathname, item]);

  const handleItemClick = (hashChildren: boolean, parentKey: string) => {
    if (hashChildren) {
      setExpandedItems((prevState) => ({
        [parentKey]: !prevState[parentKey],
      }));
    }
  };

  return (
    <Box>
      <List sx={{ p: 1 }}>
        {item.map((item, index) => {
          const hashChildren =
            'children' in item && Boolean(item.children.length);
          const isSelected =
            decodeURI(pathname) === ('href' in item ? item.href : '');
          const isExpanded =
            expandedItems[`${parentKey}-${item.name}`] || false;
          return (
            <Fragment key={index}>
              <ListItem disablePadding sx={{ my: 0 }}>
                <ListItemButton
                  LinkComponent={hashChildren ? undefined : Link}
                  // href={'href' in item ? item.href : undefined}
                  sx={{
                    borderRadius: 1,
                    p: 0.4,
                    pl: `${depth === 0 ? '20px' : depth * 6}px`,
                  }}
                  onClick={() => {
                    if ('children' in item) {
                      handleItemClick(
                        hashChildren,
                        `${parentKey}-${item.name}`
                      );
                    }
                  }}
                  selected={isSelected}
                >
                  {item.icon && (
                    <ListItemIcon>
                      <item.icon color="primary" />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={
                      depth === 0 ? item.name : `${index + 1}.${item.name}`
                    }
                    primaryTypographyProps={{
                      variant: 'body2',
                      color:
                        isSelected || isExpanded ? 'primary.main' : undefined,
                    }}
                  />
                  {hashChildren && (
                    <ListItemIcon
                      sx={{
                        minWidth: '22px',
                        rotate: isExpanded ? '180deg' : '0',
                      }}
                    >
                      <ArrowDropDownIcon
                        color={isSelected || isExpanded ? 'primary' : undefined}
                      />
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </ListItem>
              {hashChildren && (
                <Collapse
                  in={isExpanded}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    maxHeight: depth > 0 ? undefined : 400,
                    overflow: 'hidden',
                    overflowY: 'auto',
                  }}
                >
                  <ArtistMenuList
                    item={item.children}
                    depth={depth + 1}
                    parentKey={`${parentKey}-${item.name}`}
                  />
                </Collapse>
              )}

              {item.divider && <Divider sx={{ my: 1 }} />}
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
};
ArtistMenuList.displayName = 'ArtistMenuList';
