import { Header } from "@/components/composite/Header";
import db from "@/infrastructure/db/db";
import { ViewContent } from "@/components/composite/ViewContent";

export default async function ListPage() {

  const lists = await db.shoppingList.findMany({});

  return (<>
    <Header
      title='Lists'
      left={{ icon: 'plus', href: '/new' }}
      right={{ text: 'Edit' }}
    />
    <ViewContent>
      {lists.map((item) => (
        <div key={item.id}>{item.name}, Products: {item.products.length}</div>
      ))}
    </ViewContent>
  </>);
}
