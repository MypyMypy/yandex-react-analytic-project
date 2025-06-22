import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RoutesEnum } from '../lib/routes';
import { Header } from '@/widgets/header';
import { BaseLayoutWithHeader } from '@/shared/ui';

const Analytic = lazy(() => import('@/pages/analytic'));
const Generator = lazy(() => import('@/pages/generator'));
const History = lazy(() => import('@/pages/history'));

export const AppRoutes: React.FC = () => (
  // TODO Было бы славно вынести Header, но не успеваю
  <Suspense
    fallback={<BaseLayoutWithHeader header={<Header />} content="Loading..." />}
  >
    <Routes>
      <Route path={RoutesEnum.CSV_ANALITIC} element={<Analytic />} />
      <Route path={RoutesEnum.CSV_GENERATOR} element={<Generator />} />
      <Route path={RoutesEnum.CSV_HISTORY} element={<History />} />
      <Route path="*" element={<h1>Страница не найдена</h1>} />
    </Routes>
  </Suspense>
);
