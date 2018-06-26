import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Nav, NavItem, NavLink, Badge, DropdownToggle, DropdownMenu } from 'reactstrap';
import Dashboard from '../../containers/Dashboard/Dashboard';
import { connect } from 'react-redux';
import { getSkillsAction, editSkillsAction, createSkillsAction, getIdCategoriesAction } from '../../actions/skill'; 
import { getCheckAdminAction } from '../../actions/auth'; 

import {
  AppAside,
  AppAsideToggler,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  AppSidebarToggler,
} from '../../modules';
// sidebar nav config
import navigation from '../../_nav.js';
import navigationAdmin from '../../_navAdmin.js';
// routes config
import routes from '../../routes.js';

import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import avatar from '../../assets/img/avatars/6.jpg'

class MenuApp extends Component {
  constructor() {
    super();
    this.state = {
        skill: {skillTitle:'', mark: '', disposition: '', comment: ''},
        displayDialog: false,
        idSkill : 1,
    };
  }

  componentWillMount() {
    this.props.getSkillsFunction(); 
    this.props.getdCategoriesFunction();
    this.props.getCheckAdminFunction();
  }
  render() {
    const {photo, checkAdmin} = this.props;
    return (
      <div className="app">
        <AppHeader fixed>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 35, height: 30, alt: 'Roadmaps' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
          <Nav className="ml-auto" navbar>
            <AppHeaderDropdown>
              <DropdownToggle nav>
                <img src={photo ? photo : 'https://lh3.googleusercontent.com/-gXrDT7eEAoI/AAAAAAAAAAI/AAAAAAAAAAA/ylTkWjUFffI/photo.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right style={{ right: 'auto', height: '400px' }}>
                AppHeaderDropdown
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
          <AppAsideToggler className="d-md-down-none" />
          <AppAsideToggler className="d-lg-none" mobile />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={checkAdmin ? navigationAdmin :  navigation } {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main" style={{display: '0'}}>
            <AppBreadcrumb appRoutes={routes}>
            </AppBreadcrumb>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
                <Redirect from="/" to="/bubble" />
                { checkAdmin ? <Redirect from="/" to="/compare" /> : null}
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden display="lg">
            Aside
          </AppAside>
        </div>
        <AppFooter>
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
      skills: state.skill.skills.data,
      skillsAll: state.skill.allSkills.data,
      id: state.skill.id.data,     
      checkAdmin: state.auth.checkAdmin,
      photo: state.auth.photo
  };
}
function mapDispathToProps(dispatch) {
  return {
      getSkillsFunction: function () {
          dispatch(getSkillsAction());
      },
      getdCategoriesFunction: function () {
          dispatch(getIdCategoriesAction());
      },
      editSkillFunction: function (skill) {
          dispatch(editSkillsAction(skill));
      }, 
      createSkillsAction: function (skill){
          dispatch(createSkillsAction(skill));
      },
      getCheckAdminFunction : function (){
        dispatch(getCheckAdminAction());
      }
  };
}

export default connect(mapStateToProps,mapDispathToProps)(MenuApp);

