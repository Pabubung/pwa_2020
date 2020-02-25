import React, { Component } from 'react';
import asyncComponent from '../../helpers/AsyncFunc';
import Route from '../../components/utility/customRoute';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('../Home/')),
  },
  {
    path: 'notification',
    component: asyncComponent(() => import('../Notification/')),
  },
  {
    path: 'leave-request-list',
    component: asyncComponent(() => import('../MyLeaveRequest/')),
  },  
  {
    path: 'leave-request-create',
    component: asyncComponent(() => import('../CreateLeaveRequest/')),
  }, 
  {
    path: 'leave-request-approval',
    component: asyncComponent(() => import('../ApprovalLeaveRequest/')),
  }, 
  {
    path: 'leave-request-approval-history',
    component: asyncComponent(() => import('../HistoryApprovalLeaveRequest/')),
  },
  {
    path: 'other-applications-my-ticket',
    component: asyncComponent(() => import('../MyTicketOtherApplications/')),
  },
  {
    path: 'approval-ticket',
    component: asyncComponent(() => import('../MyTicketOtherApplications/approval')),
  },
  {
    path: 'other-applications-create-ticket',
    component: asyncComponent(() => import('../CreateTicketOtherApplications/')),
  },
  {
    path: 'eventlist-home',
    component: asyncComponent(() => import('../EventList_home/')),
  },
  {
    path: 'eventlist-dashboard',
    component: asyncComponent(() => import('../EventList_dashboard/')),
  },
  {
    path: 'eventlist-agenda',
    component: asyncComponent(() => import('../EventList_agenda/')),
  },
  {
    path: 'eventlist-agenda-menu',
    component: asyncComponent(() => import('../EventList_agenda_menu/')),
  },
  {
    path: 'eventlist-agenda-menu-files',
    component: asyncComponent(() => import('../EventList_agenda_menu_files/')),
  },
  {
    path: 'eventlist-agenda-menu-question',
    component: asyncComponent(() => import('../EventList_agenda_menu_question/')),
  },
  {
    path: 'eventlist-agenda-menu-polling',
    component: asyncComponent(() => import('../EventList_agenda_menu_polling/')),
  },
  {
    path: 'eventlist-agenda-menu-polling-detail',
    component: asyncComponent(() => import('../EventList_agenda_menu_polling_detail/')),
  },
  {
    path: 'eventlist-barcode',
    component: asyncComponent(() => import('../EventList_barcode/')),
  },
  {
    path: 'eventlist-attend',
    component: asyncComponent(() => import('../EventList_attend/')),
  },
  {
    path: 'eventlist-speaker',
    component: asyncComponent(() => import('../EventList_speaker/')),
  },
  {
    path: 'eventlist-sponsor',
    component: asyncComponent(() => import('../EventList_sponsor/')),
  },
  {
    path: 'eventlist-sponsor-detail',
    component: asyncComponent(() => import('../EventList_sponsor_detail/')),
  },
  {
    path: 'eventlist-speaker-detail',
    component: asyncComponent(() => import('../EventList_speaker_detail/')),
  },
  {
    path: 'eventlist-about',
    component: asyncComponent(() => import('../EventList_about/')),
  },  
  {
    path: 'eventlist-maps',
    component: asyncComponent(() => import('../EventList_maps/')),
  }, 
  {
    path: 'news-gue-sehat',
    component: asyncComponent(() => import('../News_gue_sehat/')),
  },
  {
    path: 'news-headline-news',
    component: asyncComponent(() => import('../News_headline_news')),
  },
  {
    path: 'dexan-learn',
    component: asyncComponent(() => import('../Dexan_learn')),
  },
  {
    path: 'profile',
    component: asyncComponent(() => import('../Profile')),
  },
  {
    path: 'qrcode',
    component: asyncComponent(() => import('../Qrcode')),
  },  
  {
    path: 'blank-page',
    component: asyncComponent(() => import('../BlankPage.js')),
  },
  {
    path: 'task',
    component: asyncComponent(() => import('../Task/')),
  }, 
  {
    path: 'detail-news/:kategori/:id',
    component: asyncComponent(() => import('../News_detail/'))
  }, 
  {
    path: 'logout',
    component: asyncComponent(() => import('../Logout.js')),
  },
  {
    path: 'etravel_approval',
    component: asyncComponent(() => import('../eTravel_approval/')),
  },  
  {
    path: 'spkl_approval',
    component: asyncComponent(() => import('../Spkl_approval')),
  },   
  {
    path: 'list_approval',
    component: asyncComponent(() => import('../List_approval'))
  },    
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
