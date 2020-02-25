import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IntlMessages from '../../../src/components/utility/intlMessages';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import { Row, FullColumn } from '../../../src/components/utility/rowColumn';
import BasicTabs from './basicTabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  iconRoot: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  scrollRoot: {
    flexGrow: 1,
    width: 'auto',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class TabsExamples extends Component {
  render() {
    const { props } = this;
    return (
      <div>
        <BasicTabs {...props} />
      </div>
    );
  }
}
export default withStyles(styles)(TabsExamples);
