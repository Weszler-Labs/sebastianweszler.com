import ContactPage from '../[locale]/contact/page';

export default async function ContactPageWrapper() {
  return <ContactPage params={Promise.resolve({ locale: 'en' })} />;
}
