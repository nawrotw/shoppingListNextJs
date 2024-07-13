import { Header } from "@/components/composite/Header";


export const HeaderStory = () => {
  return (<div className='w-[350px] flex flex-col'>
    <Header title='Lists'></Header>
    <Header title='Lists' right={{ text: 'Edit' }}></Header>
    <Header title='Lists' right={{ icon: 'plus' }}></Header>
    <Header title='Lists' right={{ text: 'Next', icon: 'plus' }}></Header>
    <Header left={{ text: 'Lists', icon: 'arrowLeft' }} title='Shopping List'></Header>
    <Header left={{ text: 'Cancel' }} title='Add to Shopping List' right={{ text: 'Save' }}></Header>
  </div>);
};
