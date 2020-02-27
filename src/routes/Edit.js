import React, { useState, useEffect } from 'react';
import history from '../redux/history';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Button
} from "@material-ui/core";
import { Formik } from "formik";

import colors from '../styles/colors';

import { config as legalEntity } from '../utils/legalEntityEdit'
import { config as organizationalUnit} from '../utils/organizationalUnitEdit'

import { rewriteOrgidJson, selectPendingState, selectSuccessState, selectWizardOrgidJson, extendOrgidJson, sendChangeOrgidUriAndHashRequest } from "../ducks/wizard";

import { Section } from "../components";
import ArrowLeftIcon from "../assets/SvgComponents/ArrowLeftIcon";
import DialogComponent from '../components/Dialog';

const styles = makeStyles({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  form: {
    paddingBottom: '60px'
  },
  screenHeading: {
    paddingTop: '16px',
  },
  buttonWrapper: {
    marginLeft: '-8px'
  },
  buttonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
    color: colors.primary.black
  },
  backButtonIcon: {
    width: '13px',
    height: '12px',
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '11px'
  },
  editHeaderContainer: {
    paddingTop: '20px',
  },
  editHeaderTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest
  },
  editHeaderSubtitleContainer: {
    padding: '20px 0 10px'
  },
  editHeaderSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.common
  },
  editButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  editButton: {
    height: '44px',
    textTransform: 'none',
    backgroundImage: colors.gradients.orange,
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px',
    padding: '6px 20px',
  },
  editButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  mainContent: {
    marginTop: '40px',
    paddingBottom: '160px'
  },
  formContainer: {
    border: `1px solid ${colors.greyScale.lighter}`,
    borderRadius: '8px',
    boxShadow: ' 0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    backgroundColor: colors.primary.white,
  },
  formContentWrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: '80px 80px 60px'
  },
  formTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest
  },
  formSubtitle: {
    position: 'relative',
    top: '10px',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.common,
  },
  dropzoneContent: {
    '& > div > p + div': {
      marginTop: '0'
    }
  },
  pendingContentWrapper: {
    padding: '46px 80px 80px'
  },
  pendingIllustration: {
    width: '100%'
  },
  pendingTextContainer: {
    marginBottom: '10px',
  },
  pendingTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  pendingSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.greyScale.common,
    padding: '16px 0'
  },
  pendingButtonWrapper: {
    display: 'table',
    margin: '0 auto',
  },
  pendingButton: {
    textTransform: 'none',
  },
  pendingButtonLabel: {
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '.005em',
    color: colors.secondary.cyan
  },
  pendingButtonIcon: {
    width: '12px',
    height: '12px',
    color: colors.secondary.cyan,
    transform: 'rotate(180deg)',
    marginLeft: '14px'
  },
  successButton: {
    height: '44px',
    backgroundImage: colors.gradients.orange,
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px',
    padding: '6px 20px',
  },
  successButtonLabel: {
    color: colors.primary.white
  }
});

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  )
};

const Edit = (props) => {
  const orgid = history.location.pathname.split('/')[2];
  const classes = styles();
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const wizardType = _.get(history, 'location.state.type', 'legalEntity');
  const jsonContent = _.get(history, 'location.state.jsonContent', {});
  const types = { legalEntity, organizationalUnit };
  const editConfig = types[wizardType];
  console.log(editConfig, wizardType);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    if(orgid) {
      props.rewriteOrgidJson(jsonContent)
    }
  }, [orgid]); // eslint-disable-line react-hooks/exhaustive-deps

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const validators = {};

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  const setHostingDialog = () => {
    return (
      <DialogComponent
        handleClose={handleCloseModal}
        isOpen={isModalOpen}
        children={(
          <div>
            hosting
          </div>
        )}
      />
    )
  };

  return (
    <div className={classes.mainContainer}>
      <div>
        <Formik
          initialValues={Object.assign({}, props.orgidJson)}
          enableReinitialize={true}
          validate={values => {
            const errors = {};
            _.each(validators, (validator, orgidJsonPath) => {
              const value = _.get(values, orgidJsonPath, false);
              if (value !== false) {
                const {error} = validator.validate(value);
                if (error) {
                  _.set(errors, orgidJsonPath, error.toString());
                }
              }
            });
            if (!_.isEmpty(errors)) console.log('ERRORS', errors);
            return errors;
          }}
          onSubmit={(values) => {
            console.log('onSubmit', values);
            props.extendOrgidJson(values);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
            <form onSubmit={handleSubmit} className={classes.form}>

              <Container>
                <div className={classes.screenHeading}>
                  <div className={classes.buttonWrapper}>
                    <Button onClick={history.goBack}>
                      <Typography variant={'caption'} className={classes.buttonLabel}>
                        <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                        Back to organization
                      </Typography>
                    </Button>
                  </div>
                </div>
              </Container>

              <Container>
                <Grid container spacing={5} justify={'space-between'} alignItems={'center'} className={classes.editHeaderContainer}>
                  <Grid item sm={9}>
                    <Typography variant={'h4'} className={classes.editHeaderTitle}>
                      Editing organization profile
                    </Typography>
                    <div className={classes.editHeaderSubtitleContainer}>
                      <Typography variant={'subtitle2'} className={classes.editHeaderSubtitle}>
                        Every profile change requires an Ethereum transaction. Make sure to have at least 0.1 Ether in your MetaMask account before you save your changes and update your profile.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item sm={3} className={classes.editButtonContainer}>
                    <Button type="submit" disabled={isSubmitting} onClick={handleOpenModal} className={classes.editButton}>
                      <Typography variant={'caption'} className={classes.editButtonLabel}>{'Save and Update'}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Container>

              <Container>
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  indicatorColor='primary'
                  textColor="primary"
                >
                  {_.map(editConfig, (tab, index) => <Tab key={index} label={tab.name}/>)}
                </Tabs>
              </Container>
              {_.map(editConfig, (tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                  <Container>
                    <Grid container spacing={5}>
                      <Grid item xs={12} lg={5}>
                        {
                          tab.sections.left.map((section, index) => {
                            return (
                              <Section
                                key={index}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                data={section}
                              />
                            )
                          })
                        }
                      </Grid>
                      <Grid item xs={12} lg={1}/>
                      <Grid item xs={12} lg={5} className={classes.dropzoneContent}>
                        {
                          tab.sections.right.map((section, index) => {
                            return (
                              <Section
                                key={index}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                data={section}
                              />
                            )
                          })
                        }
                      </Grid>
                      <Grid item xs={12} lg={1}/>
                    </Grid>
                  </Container>
                </TabPanel>
              ))}
              {setHostingDialog()}
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    pendingTransaction: selectPendingState(state),
    successTransaction: selectSuccessState(state),
    orgidJson: selectWizardOrgidJson(state),
  }
};

const mapDispatchToProps = {
  rewriteOrgidJson,
  sendChangeOrgidUriAndHashRequest,
  extendOrgidJson
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
