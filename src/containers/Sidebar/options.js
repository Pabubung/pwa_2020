import { getDefaultPath } from '../../helpers/urlSync';

const options = [
  {
    label: 'Home',
    key: '',
    leftIcon: 'home',
    hideBreadCrumb: true,
  },
  {
    label: 'Gue Sehat',
    key: 'news-gue-sehat',
    leftIcon: 'shutter_speed',
    hideBreadCrumb: true,
  },
  // {
  //   label: 'News',
  //   leftIcon: 'shutter_speed',
  //   key: 'News',
  //   children: [
  //     {
  //       label: 'Headlines & News',
  //       icon: 'map',
  //       key: 'news-headline-news',
  //     },
  //     {
  //       label: 'Gue Sehat',
  //       key: 'news-gue-sehat',
  //     }
  //   ],
  // },
  {
    label: 'Employee Self Service',
    leftIcon: 'extension',
    key: 'employeeselfservices',
    children: [
      {
        label: 'My Leave Request',
        key: 'leave-request-list',
      },
      {
        label: 'Approval',
        icon: 'map',
        // key: 'leave-request-approval',
        key: 'list_approval'
      },
      {
        label: 'History Approval',
        icon: 'map',
        key: 'leave-request-approval-history',
      },
    ],
  },
  {
    label: 'IT-138',
    leftIcon: 'all_inbox',
    key: 'otherapplications',
    children: [
      {
        label: 'My Ticket',
        key: 'other-applications-my-ticket',
      },
      // {
      //   label: 'Approval',
      //   key: 'approval-ticket',
      // },
      {
        label: 'Create Ticket',
        key: 'other-applications-create-ticket',
      }
    ],
  },
  // {
  //   label: 'Approval',
  //   leftIcon: 'assignment',
  //   key: 'allapproval',
  //   children: [
  //     {
  //       label: 'eTravel',
  //       key: 'etravel_approval',
  //     },
  //     {
  //       label: 'SPKL',
  //       key: 'spkl_approval',
  //     },
  //     {
  //       label: 'Car Maintenance',
  //       key: 'car_maintenance_approval',
  //     }
  //   ],
  // },
  // {
  //   label: 'Task',
  //   key: 'task',
  //   leftIcon: 'subtitles',
  //   hideBreadCrumb: true,
  // },
  {
    label: 'Event List',
    key: 'eventlist-home',
    leftIcon: 'event',
    hideBreadCrumb: true,
  },
  {
    label: 'Dexan Learn',
    key: 'dexan-learn',
    leftIcon: 'school',
    hideBreadCrumb: true,
  },
  {
    label: 'Logout',
    key: 'logout',
    leftIcon: 'exit_to_app',
    hideBreadCrumb: true,
  }
];
const getBreadcrumbOption = () => {
  const preKeys = getDefaultPath();
  let parent, activeChildren;
  options.forEach(option => {
    if (preKeys[option.key]) {
      parent = option;
      (option.children || []).forEach(child => {
        if (preKeys[child.key]) {
          activeChildren = child;
        }
      });
    }
  });
  return { parent, activeChildren };
};
export default options;
export { getBreadcrumbOption };
