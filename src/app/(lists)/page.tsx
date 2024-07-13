import { Header } from "@/components/composite/Header";
import db from "@/infrastructure/db/db";

export default async function ListPage() {

  const lists = await db.shoppingList.findMany({});

  return (
    <main className="p-4">
      <Header
        title='Lists'
        left={{ icon: 'plus', href: '/new' }}
        right={{ text: 'Edit' }}
      />

      {lists.map((item) => (
        <div key={item.id}>{item.name}, Products: {item.products.length}</div>
      ))}
    </main>
  );
}
