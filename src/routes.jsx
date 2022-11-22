import { lazy, Suspense } from 'react'
import { Loading } from './components/Loading'
import PrivateRoute from './components/PrivateRoute'

const MainLayout = lazy(() => import('./layout/MainLayout'))
const HomePage = lazy(() => import('./pages/HomePage/index'))

const MemberPage = lazy(() => import('./pages/Member/index'))
// const PersonelInformationPage = lazy(() => import('./pages/Member/PersonelInformationPage'))
const UpdateMemberPage = lazy(() => import('./pages/Member/UpdateMemberPage'))

const ApplicationPage = lazy(() => import('./pages/Application/index'))
const AllApplicationPage = lazy(() => import('./pages/Application/AllApplicationPage'))
const DetailApplicationPage = lazy(() => import('./pages/Application/DetailApplicationPage'))
const ListApplicationPage = lazy(() => import('./pages/Application/ListApplicationPage'))

const FormPage = lazy(() => import('./pages/Form/index'))
const ApplicationFormPage = lazy(() => import('./pages/Form/ApplicationFormPage'))
const ApplicationFormTwo = lazy(() => import('./pages/Form/ApplicationFormTwo'))
// const ApplicationFormPage = lazy(() => import('./pages/Form/ApplicationFormPage'))
// const ApplicationFormPage = lazy(() => import('./pages/Form/ApplicationFormPage'))

const LoginPage = lazy(() => import('./components/Login'))

/** @type {import('react-router-dom').RouteObject[]} */
const routes = [
  {
    element: <MainLayout />,
    lazy: true,
    children: [
      {
        index: true,
        name: 'homepage',
        element: <HomePage />,
        auth: true,
        lazy: true,
      },
      {
        path: 'members',
        name: 'members',
        children: [
          {
            index: true,
            element: <MemberPage />,
            auth: true,
            lazy: true,
          },
          // {
          //   path: 'detail',
          //   name: 'detail',
          //   element: <PersonelInformationPage />,
          //   auth: true,
          //   lazy: true,
          // },
          {
            path: 'update',
            name: 'update',
            element: <UpdateMemberPage />,
            auth: true,
            lazy: true,
          },
        ],
      },
      {
        path: 'applications',
        name: 'applications',
        children: [
          {
            index: true,
            element: <ApplicationPage />,
            auth: true,
            lazy: true,
          },
          {
            path: 'allapplications',
            name: 'allapplications',
            element: <AllApplicationPage />,
            auth: true,
            lazy: true,
          },
          {
            path: 'list/:id',
            name: 'list',
            element: <ListApplicationPage />,
            auth: true,
            lazy: true,
          },
          {
            path: 'detail',
            name: 'detail',
            element: <DetailApplicationPage />,
            auth: true,
            lazy: true,
          },
        ],
      },
      {
        path: 'forms',
        name: 'forms',
        children: [
          {
            index: true,
            element: <FormPage />,
            lazy: true,
          },
          {
            path: 'applicationForms/:id',
            // path: 'applicationForms',
            name: 'applicationForms',
            element: <ApplicationFormPage />,
            lazy: true,
          },
          {
            path: 'applicationFormsTwo',
            // path: 'applicationForms',
            name: 'applicationFormsTwo',
            element: <ApplicationFormTwo />,
            lazy: true,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    name: 'login',
    element: <LoginPage />,
    lazy: true,
  },
]



const mapRoute = (list) => {
  return list.map((item) => {
    if (item?.auth && 'element' in item) {
      item.element = <PrivateRoute>{item.element}</PrivateRoute>
    }

    if (item?.lazy && 'element' in item) {
      item.element = <Suspense fallback={<Loading />}>{item.element}</Suspense>
    }

    // if (item?.wrap && 'element' in item) {
    //   item.element = <Wrapper>{item.element}</Wrapper>
    // }

    // if ('element' in item) {
    //   item.element = <RouteTransition key={index}>{item.element}</RouteTransition>
    // }

    if ('children' in item) {
      item.children = mapRoute(item.children)
    }

    return item
  })
}

const finalRoutes = mapRoute(routes)


export default finalRoutes
