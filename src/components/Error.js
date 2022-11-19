import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Oops! Some thing went wrong!!!',
  errorText2: 'Make Sure You are online and restart the App',
};

class Error extends React.PureComponent {
  render() {
    const {errorText1, errorText2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.errTxt1}>{errorText1}</Text>
        <Text style={styles.errTxt2}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errTxt1: {
    fontWeight: '600',
  },
});

Error.prototype = propTypes;
Error.defaultProps = defaultProps;

export default Error;
