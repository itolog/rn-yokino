import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import NetInfo from '@react-native-community/netinfo';

import { NetInfoState } from '../interface/netStat';

// Store import
import { AppState } from '../../store/createStore';
import { getNetState } from '../../store/netinfo/selectors';
import { Actions as netInfoActions } from '../../store/netinfo/actions';

function withPageState(WrappedComponent: any) {
  // STORE PROPS
  const mapStateToProps = (state: AppState) => {
    return {
      netInfo: getNetState(state),
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadNetInfo: (payload: NetInfoState) =>
      dispatch(netInfoActions.getNetInfo(payload)),
  });

  type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

  class WithPageState extends PureComponent<Props, {}> {
    unsubscribe: any;

    componentDidMount(): void {
      this.unsubscribe = NetInfo.addEventListener(state => {
        this.props.loadNetInfo({
          type: state.type,
          isInternetReachable: state.isInternetReachable,
          isConnected: state.isConnected,
          details: { ...state.details },
        });
      });
    }

    componentWillUnmount(): void {
      this.unsubscribe();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithPageState);
}

export default withPageState;
