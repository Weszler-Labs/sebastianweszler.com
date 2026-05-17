import ProjectsPage from '../[locale]/projects/page';

export default async function ProjectsPageWrapper() {
  return <ProjectsPage params={Promise.resolve({ locale: 'en' })} />;
}
