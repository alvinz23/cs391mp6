import { redirect } from 'next/navigation';
import getCollection, { URL_COLLECTION } from '@/db';

export default async function AliasPage({params,}: {
  params: { alias: string };
}) {
  const collection = await getCollection(URL_COLLECTION);
  const entry = await collection.findOne({ alias: params.alias });

  if (!entry) {
    return (
      <div style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>
        This link does not exist.
      </div>
    );
  }

  redirect(entry.url);
}