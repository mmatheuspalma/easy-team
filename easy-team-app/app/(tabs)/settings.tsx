import { Settings } from '@easyteam/ui';

export default function SettingsScreen() {
  return <Settings 
    onSave={({ employees }) => {
      console.log(employees)
    }}
    onEvent={event => console.log(event)}
  />;
}
