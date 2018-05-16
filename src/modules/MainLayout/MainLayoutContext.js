import React from 'react';
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
const MainLayoutContext = React.createContext({
  setTitle: () => {},
  setAppBarActions: () => {},
  restoreDefaultAppBar: () => {},
  setOnSearch: () => {},
  setAppBarData: () => {}
});

export default MainLayoutContext;

export const MainLayoutContextWrapper = WrappedComponent => props => (
  <MainLayoutContext.Consumer>
    {mainLayoutContext => <WrappedComponent mainLayoutContext={mainLayoutContext} {...props} />}
  </MainLayoutContext.Consumer>
);
