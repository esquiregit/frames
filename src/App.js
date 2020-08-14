import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

const Blog           = React.lazy(() => import('./Components/External/Blog/Blog'));
const Shop           = React.lazy(() => import('./Components/External/Shop'));
const Home           = React.lazy(() => import('./Components/External/Home'));
const About          = React.lazy(() => import('./Components/External/About'));
const Login          = React.lazy(() => import('./Components/External/Auth/Login'));
const Print          = React.lazy(() => import('./Components/External/Print'));
const Trade          = React.lazy(() => import('./Components/External/Trade'));
const Design         = React.lazy(() => import('./Components/External/Design'));
const Error404       = React.lazy(() => import('./Components/Extras/FourZeroFour'));
const Register       = React.lazy(() => import('./Components/External/Auth/Register'));
const Recovery       = React.lazy(() => import('./Components/External/Auth/Recovery'));
const FrameType      = React.lazy(() => import('./Components/External/FrameType'));
const GalleryWall    = React.lazy(() => import('./Components/External/GalleryWall'));
const ReferFriend    = React.lazy(() => import('./Components/External/ReferFriend'));
const StartAFrame    = React.lazy(() => import('./Components/External/StartAFrame'));
const PasswordChange = React.lazy(() => import('./Components/External/Auth/PasswordChange'));

const Dashboard      = React.lazy(() => import('./Components/Internal/Dashboard/Dashboard'));
const AuditTrail     = React.lazy(() => import('./Components/Internal/AuditTrail'));

function App() {
    return (
        <React.Suspense fallback={<div className="loading-div"><CircularProgress color="primary" /></div>}>
            <BrowserRouter>
                <Switch>
                    <Route path='/'                           component={ Home }           exact />
                    <Route path='/blog/'                      component={ Blog }           exact />
                    <Route path='/shop/'                      component={ Shop }           exact />
                    <Route path='/about/'                     component={ About }          exact />
                    <Route path='/print/'                     component={ Print }          exact />
                    <Route path='/trade/'                     component={ Trade }          exact />
                    <Route path='/login/'                     component={ Login }          exact />
                    <Route path='/sign-up/'                   component={ Register }       exact />
                    <Route path='/recovery/'                  component={ Recovery }       exact />
                    <Route path='/dashboard/'                 component={ Dashboard }      exact />
                    <Route path='/activities/'                component={ AuditTrail }     exact />
                    <Route path='/gallery-wall/'              component={ GalleryWall }    exact />
                    <Route path='/start-a-frame/'             component={ StartAFrame }    exact />
                    <Route path='/refer-a-friend/'            component={ ReferFriend }    exact />
                    <Route path='/design/:frame_id'           component={ Design }         exact />
                    <Route path='/password-recovery/'         component={ Recovery }       exact />
                    <Route path='/start-a-frame/:type/'       component={ FrameType }      exact />
                    <Route path='/password-change/:id/:code/' component={ PasswordChange } exact />
                    <Route path='*' component={ Error404 } />
                </Switch>
            </BrowserRouter>
        </React.Suspense>        
    );
}

export default App;
