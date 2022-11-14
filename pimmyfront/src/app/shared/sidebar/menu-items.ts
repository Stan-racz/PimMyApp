import { RouteInfo } from './sidebar.metadata';
let ROUTES: RouteInfo[];
let role = localStorage.getItem('role');
if (role == "admin") {
  ROUTES = [
    {
      path: '/component/demande-conges',
      title: 'Demande de congés',
      icon: 'bi bi-calendar-plus',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/visualisation',
      title: 'Visualisation historique',
      icon: 'bi bi-calendar3',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/convention-collective',
      title: 'Convention collective',
      icon: 'bi bi-clipboard',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/validation-conges',
      title: 'Validation congés',
      icon: 'bi bi-check2-circle',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/visualisation-absences',
      title: 'Visualisation absences',
      icon: 'bi bi-eye',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/ajout-utilisateur',
      title: 'Ajout utilisateur',
      icon: 'bi bi-person-plus',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/services',
      title: 'Services',
      icon: 'bi bi-gear',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/synthese-conges',
      title: 'Synthèse des congés',
      icon: 'bi bi-clipboard-data',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/fiche-utilisateur',
      title: 'Fiche utilisateur',
      icon: 'bi bi-person',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/motif-absence',
      title: 'Motif d\'absence',
      icon: 'bi bi-calendar2-x',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/fermeture-institution',
      title: 'Fermeture institution',
      icon: 'bi bi-x-octagon',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/visibilite-employes',
      title: 'Visibilité des employés',
      icon: 'bi bi-eye',
      class: '',
      extralink: false,
      submenu: []
    },
  ];
}
if (role == "manager") {
  ROUTES = [
    {
      path: '/component/demande-conges',
      title: 'Demande de congés',
      icon: 'bi bi-calendar-plus',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/convention-collective',
      title: 'Convention collective',
      icon: 'bi bi-clipboard',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/validation-conges-manager',
      title: 'Validation congés',
      icon: 'bi bi-check2-circle',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/visualisation-absences',
      title: 'Visualisation absences',
      icon: 'bi bi-eye',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/synthese-conges',
      title: 'Synthèse des congés',
      icon: 'bi bi-clipboard-data',
      class: '',
      extralink: false,
      submenu: []
    },
  ];
}

if (role == "user") {
  ROUTES = [
    {
      path: '/component/demande-conges',
      title: 'Demande de congés',
      icon: 'bi bi-calendar-plus',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/convention-collective',
      title: 'Convention collective',
      icon: 'bi bi-clipboard',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/component/synthese-conges',
      title: 'Synthèse des congés',
      icon: 'bi bi-clipboard-data',
      class: '',
      extralink: false,
      submenu: []
    },
  ];
}

export { ROUTES }