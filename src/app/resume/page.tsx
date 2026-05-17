import ResumePage from '../[locale]/resume/page';

export default async function ResumePageWrapper() {
  return <ResumePage params={Promise.resolve({ locale: 'en' })} />;
}
