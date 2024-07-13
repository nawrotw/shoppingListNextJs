import { Header } from "@/components/composite/Header";


export const HeaderStory = () => {
  return (<div className='w-[350px] flex flex-col'>
    <Header title='Lists'></Header>
    <Header title='Lists' rightText='Edit'></Header>
    <Header title='Lists' rightIcon='plus'></Header>
    <Header title='Lists' rightText='Next' rightIcon='plus'></Header>
    <Header leftText='Lists' leftIcon='arrowLeft' title='Shopping List'></Header>
    <Header leftText='Cancel' title='Add to Shopping List' rightText='Save'></Header>
  </div>);
};
