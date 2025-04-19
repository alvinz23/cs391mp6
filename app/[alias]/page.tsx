import { redirect } from 'next/navigation';
import getCollection, { URL_COLLECTION } from '@/db';

type PageProps = {
  params: { alias: string };
};

export default async function AliasPage({ params }: PageProps) {
  const collection = await getCollection(URL_COLLECTION);
  const entry = await collection.findOne({ alias: params.alias });

  if (!entry) {
    return (
      <div
        style={{
          color: 'white',
          textAlign: 'center',
          paddingTop: '5rem',
          fontSize: '1.5rem',
        }}
      >
        This link does not exist.
      </div>
    );
  }

  redirect(entry.url);
}