import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";

export default function RecipesPage() {

  return (<>
    <Header title='Recipes' right={{ icon: 'plus' }}></Header>
    <ViewContent>
      <h1>Recipes</h1>
    </ViewContent>
  </>);
}
