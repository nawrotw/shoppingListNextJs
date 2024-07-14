import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";

export default function ProductsPage() {

  return (<>
    <Header title='Products' right={{ icon: 'plus' }}></Header>
    <ViewContent>
      <h1>Products</h1>
    </ViewContent>
  </>);
}
