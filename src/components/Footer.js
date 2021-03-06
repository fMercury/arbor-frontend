import React from 'react';
import history from '../redux/history';

import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../assets/SvgComponents/Logo';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramSocialIcon from '../assets/SvgComponents/TelegramSocialIcon';
import MediumSocialIcon from '../assets/SvgComponents/MediumSocialIcon';
import GitHubIcon from '@material-ui/icons/GitHub';

import colors from '../styles/colors';

const styles = makeStyles({
  xsHidden: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    },
  },
  xsVisible: {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '20px',
    },
  },
  footer: {
    background: colors.primary.white,
    border: 0,
    color: colors.primary.black,
    '& span': {
      marginBottom: '15px',
      marginRight: '5px'
    }
  },
  footerContent: {
    padding: '60px 0',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      padding: '40px 0'
    },
  },
  columnTitle: {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    paddingBottom: '12px',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    }
  },
  columnItem: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    padding: '4px 0',
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    transition: 'border-bottom-color .3s ease'
  },
  navLink: {
    position: 'relative',
    cursor: 'pointer',
    textDecoration: 'none',
    color: colors.greyScale.dark,
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    transition: 'color .3s ease',
    '&:hover': {
      color: colors.secondary.intenseGreen,
      '& > h6': {
        borderBottomColor: colors.secondary.intenseGreen,
      }
    }
  },
  logoButton: {
    backgroundColor: colors.primary.white,
    outline: 'none',
    cursor: 'pointer'
  },
  logo: {
    width: '89px',
    height: '32px'
  },
  socialIcon: {
    fontSize: 'large',
    marginRight: '20px',
  },
  iconFacebook: {
    color: colors.social.facebook,
  },
  iconTelegram: {
    width: '18px',
    height: '15px'
  },
  iconTwitter: {
    color: colors.social.twitter,
  },
  iconMedium: {
    width: '17px',
    height: '14px'
  },
  iconGitHub: {
    color: colors.primary.black
  },
  legalInfoContainer: {
    position: 'relative',
    borderTop: `1px solid ${colors.greyScale.lightest}`
  },
  legalInfo: {
    padding: '20px 0',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      paddingBottom: '40px'
    },
  },
  copyrightInfoWrapper: {
    width: '40%',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      paddingTop: '20px'
    },
  },
  legalInfoLabel: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.dark
  },
  socialWrapper: {
    width: '40%',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '70%',
      justifyContent: 'space-between'
    },
  }
});

export default function Footer(props) {
  const classes = styles();
  return (
    <div id="app-footer" className={classes.footer}>
      <Container>
        <Grid container className={classes.footerContent}>
          <Grid item xs={12} md={5}>
            <button onClick={() => history.push('/')} className={classes.logoButton}>
              <Logo viewBox={'0 0 90 32'} className={classes.logo}/>
            </button>
          </Grid>
          <Grid container direction="column" item xs={12} md={2} className={classes.xsHidden}>
            <Typography variant={'h4'} className={classes.columnTitle}>Organizations</Typography>
            <Link to={'/search'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>Search</Typography>
            </Link>
            <Link to={'/my-organizations/wizard'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>Create
                organization</Typography>
            </Link>
          </Grid>

          <Grid container direction="column" item xs={12} md={2} className={classes.xsHidden}>
            <Typography variant={'h4'} className={classes.columnTitle}>Directories</Typography>

            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'airline' })}><Typography variant={'h6'} className={classes.columnItem}>Airlines</Typography></div>
            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'hotel' })} ><Typography variant={'h6'} className={classes.columnItem}>Hotels</Typography></div>
            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'ota' })} ><Typography variant={'h6'} className={classes.columnItem}>Travel agencies</Typography></div>
            <div className={classes.navLink} onClick={() => history.push('/directories', { dirType: 'insurance' })} ><Typography variant={'h6'} className={classes.columnItem}>Insurance companies</Typography></div>
          </Grid>

          <Grid container direction="column" item xs={12} md={3} className={classes.xsVisible}>
            <Typography variant={'h4'} className={classes.columnTitle}>Contacts</Typography>
            <Typography variant={'h6'} className={classes.columnItem} noWrap>Gubelstrasse 11, 6300
              Zug, Switzerland</Typography>
            <a href={'mailto:join@windingtree.com'} className={classes.navLink}>
              <Typography variant={'h6'} className={classes.columnItem}>info@windingtree.com</Typography>
            </a>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.legalInfoContainer}>
        <Container>
          <Grid container justify={'space-between'} alignItems={'center'} className={classes.legalInfo}>
            <Grid item container justify={'space-between'} alignItems={'center'} className={classes.copyrightInfoWrapper}>
              <Grid item>
                <Typography variant={'caption'} className={classes.legalInfoLabel}>
                  © 2020 Arbor
                </Typography>
              </Grid>
              <Grid item>
                <Link to={'/tos'} className={classes.navLink}>
                  <Typography variant={'caption'} className={classes.legalInfoLabel}>Terms of
                    Service</Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid item container justify={'flex-end'} alignItems={'center'} className={classes.socialWrapper}>
              {
                props.socialLinks.map((item, index) => {
                  const socialIcon = type => {
                    switch (type[0]) {
                      case 'twitter':   return <TwitterIcon className={[classes.socialIcon, classes.iconTwitter].join(' ')}/>;
                      case 'facebook':  return <FacebookIcon className={[classes.socialIcon, classes.iconFacebook].join(' ')}/>;
                      case 'telegram':  return <TelegramSocialIcon className={[classes.socialIcon, classes.iconTelegram].join(' ')}/>;
                      case 'medium':    return <MediumSocialIcon className={[classes.socialIcon, classes.iconMedium].join(' ')}/>;
                      case 'github':    return <GitHubIcon className={[classes.socialIcon, classes.iconGitHub].join(' ')}/>;
                      default: return null;
                    }
                  };
                  return (
                    <Grid item lg={1} key={index.toString()}>
                      <a href={Object.values(item)} className={classes.socialLink}>
                        {socialIcon(Object.keys(item))}
                      </a>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
};

Footer.defaultProps = {
  socialLinks: [
    { facebook: 'https://facebook.com/' },
    { github: 'https://github.com/windingtree' },
    { twitter: 'https://blog.windingtree.com' },
    { medium: 'https://blog.windingtree.com/' },
    { telegram: 'https://t.me/windingtree' },
  ]
};
