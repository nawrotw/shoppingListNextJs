import { ThemePicker } from "@/components/ThemePicker";
import { Header } from "@/components/composite/Header";

export default function RecipesPage() {

  return (
    <main className="p-4">
      <Header title='Recipes' right={{icon: 'plus'}}></Header>
      <h1>Recipes</h1>

    </main>
  );
}
