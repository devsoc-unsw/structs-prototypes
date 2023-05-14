import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Roadmap from './Roadmap';

// imports all edu and quiz files.
const eduPages = import.meta.glob('./edu_pages/*.mdx');
const quizPages = import.meta.glob('./quiz_pages/*.mdx');

// generates a route for all given paths
async function generateRoutes(pages: any) {
  const routes = [];

  for (const path in pages) {
    const module = await pages[path]();
    const PageComponent = module.default;
    const routePath = '/' + path.slice(12, -4); // remove './edu_pages/' and '.mdx'
    routes.push(<Route key={routePath} path={routePath} element={<PageComponent />} />);
  }
  return routes;
}

//rendering logic, incl routes
const renderApp = async () => {
  const eduRoutes = await generateRoutes(eduPages);
  const quizRoutes = await generateRoutes(quizPages);

  const targetContainer = document.getElementById('root');
  if (targetContainer) {
    const root = createRoot(targetContainer);
    root.render(
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/roadmap" element={<Roadmap />} />
            {eduRoutes}
            {quizRoutes}
          </Routes>
        </BrowserRouter>
      </>
    );
  } else {
    console.error('Could not find targetContainer!');
  }
};

renderApp();