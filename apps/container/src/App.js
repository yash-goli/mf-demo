import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, Router, Redirect } from 'react-router-dom';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';
import Progress from './components/Progress';
import { createBrowserHistory } from 'history';

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));
const DasboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header 
            isSignedIn={isSignedIn} 
            onSignOut={() => setIsSignedIn(false)} 
            />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DasboardApp />
              </Route>
              <Route path="/" component={MarketingApp}/>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};