import { NavigationBar } from "@/components/composite/NavigationBar";


export const NavStory = () => {
  return (<div className='flex flex-col'>
    <NavigationBar className='w-[300px]'/>
    <NavigationBar className='w-[350px]'/>
    <NavigationBar className='w-[450px]'/>
    <NavigationBar className='w-[550px]'/>
  </div>);
};
