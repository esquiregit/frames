import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

const Cart               = React.lazy(() => import('./Components/External/Cart'));
const Home               = React.lazy(() => import('./Components/External/Home'));
const Login              = React.lazy(() => import('./Components/External/Auth/Login'));
const Design             = React.lazy(() => import('./Components/External/Design'));
const Orders             = React.lazy(() => import('./Components/External/Account/Orders'));
const Profile            = React.lazy(() => import('./Components/External/Account/Profile'));
const Wishlist           = React.lazy(() => import('./Components/External/Account/Wishlist'));
const Error404           = React.lazy(() => import('./Components/Extras/FourZeroFour'));
const Recovery           = React.lazy(() => import('./Components/External/Auth/Recovery'));
const Register           = React.lazy(() => import('./Components/External/Auth/Register'));
const FrameType          = React.lazy(() => import('./Components/External/FrameType'));
const GalleryWall        = React.lazy(() => import('./Components/External/GalleryWall'));
const StartAFrame        = React.lazy(() => import('./Components/External/StartAFrame'));
const Testimonies        = React.lazy(() => import('./Components/External/Account/Testimonies'));
const PasswordChange     = React.lazy(() => import('./Components/External/Auth/PasswordChange'));

const Report             = React.lazy(() => import('./Components/Internal/Report'));
const Dashboard          = React.lazy(() => import('./Components/Internal/Dashboard/Dashboard'));
const AuditTrail         = React.lazy(() => import('./Components/Internal/AuditTrail'));
const ManageRoles        = React.lazy(() => import('./Components/Internal/Roles/ManageRoles'));
const AdminProfile       = React.lazy(() => import('./Components/Internal/Profile'));
const ManageAdmins       = React.lazy(() => import('./Components/Internal/Admins/ManageAdmins'));
const ManageOrders       = React.lazy(() => import('./Components/Internal/Orders/ManageOrders'));
const ManageProducts     = React.lazy(() => import('./Components/Internal/Products/ManageProducts'));
const ManageCustomers    = React.lazy(() => import('./Components/Internal/Customers/ManageCustomers'));
const ManageCategories   = React.lazy(() => import('./Components/Internal/Categories/ManageCategories'));
const UnauthorizedAccess = React.lazy(() => import('./Components/Internal/UnauthorizedAccess'));

function App() {
    return (
        <React.Suspense fallback={<div className="loading-div"><CircularProgress color="primary" /></div>}>
            <BrowserRouter>
                <Switch>
                    <Route path='/'                           component={ Home }           exact />
                    <Route path='/cart/'                      component={ Cart }           exact />
                    <Route path='/login/'                     component={ Login }          exact />
                    <Route path='/sign-up/'                   component={ Register }       exact />
                    <Route path='/recovery/'                  component={ Recovery }       exact />
                    <Route path='/activities/'                component={ AuditTrail }     exact />
                    <Route path='/gallery-wall/'              component={ GalleryWall }    exact />
                    <Route path='/start-a-frame/'             component={ StartAFrame }    exact />
                    <Route path='/account/orders/'            component={ Orders }         exact />
                    <Route path='/account/profile/'           component={ Profile }        exact />
                    <Route path='/account/wish-list'          component={ Wishlist }       exact />
                    <Route path='/design/:product_id'         component={ Design }         exact />
                    <Route path='/password-recovery/'         component={ Recovery }       exact />
                    <Route path='/account/testimonies/'       component={ Testimonies }    exact />
                    <Route path='/start-a-frame/:type/'       component={ FrameType }      exact />
                    <Route path='/password-change/:id/:code/' component={ PasswordChange } exact />
                    
                    <Route path='/admin/roles/'              component={ ManageRoles }        exact />
                    <Route path='/admin/users/'              component={ ManageAdmins }       exact />
                    <Route path='/admin/report/'             component={ Report }             exact />
                    <Route path='/admin/orders/'             component={ ManageOrders }       exact />
                    <Route path='/admin/profile/'            component={ AdminProfile }       exact />
                    <Route path='/admin/products/'           component={ ManageProducts }     exact />
                    <Route path='/admin/customers/'          component={ ManageCustomers }    exact />
                    <Route path='/admin/dashboard/'          component={ Dashboard }          exact />
                    <Route path='/admin/categories/'         component={ ManageCategories }   exact />
                    <Route path='/admin/activities/'         component={ AuditTrail }         exact />
                    <Route path='/admin/unauthorized-access/' component={ UnauthorizedAccess } exact />
                    <Route path='*' component={ Error404 } />
                </Switch>
            </BrowserRouter>
        </React.Suspense>        
    );
}

export default App;
