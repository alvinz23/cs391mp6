import { redirect } from 'next/navigation';
import getCollection, { URL_COLLECTION } from '@/db';
export default async function AliasPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;

  const collection = await getCollection(URL_COLLECTION);
  const result = await collection.findOne({ alias });

  if (!result) {
    return (
        <div style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>
            Link does not exist.
      </div>
    );
  }

  redirect(result.url);
}