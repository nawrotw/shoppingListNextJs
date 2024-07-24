import { Checkbox } from "@/components/ui/Checkbox";


export const CheckboxStory = () => {
  return (<div>
    <div className='flex'>
      <Checkbox checked={false}/>
      <Checkbox mixed={true}/>
      <Checkbox checked={true}/>
    </div>
    <div>
      <Checkbox checked={true}>Checked</Checkbox>
      <Checkbox mixed={true}>Mixed</Checkbox>
      <Checkbox checked={false} textGap={4}>Not checked, textGap=4</Checkbox>
    </div>
  </div>);
};
