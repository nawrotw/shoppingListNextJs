import { ThemePicker } from "@/components/ThemePicker";
import { Header } from "@/components/composite/Header";

export default function ProductsPage() {

  return (
    <main className="p-4">
      <Header title='Products' rightIcon='plus'></Header>
      <ThemePicker/>
      <h1>Products</h1>

    </main>
  );
}
