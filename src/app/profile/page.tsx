import { ThemePicker } from "@/components/ThemePicker";
import { Header } from "@/components/composite/Header";

export default function ProfilePage() {

  return (
    <main className="p-4">
      <Header title='Profile'></Header>
      <ThemePicker/>
      <h1>Profile</h1>

    </main>
  );
}
