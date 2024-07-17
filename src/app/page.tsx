import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";

export default function HomePage() {

  return <>
    <Header title='Home'></Header>
    <ViewContent>
      <p className='text-center text-xl'>Home :-)</p>
    </ViewContent>
  </>
}
