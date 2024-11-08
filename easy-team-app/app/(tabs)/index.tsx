import { Clock } from "@easyteam/ui";

export default function ClockScreen() {
  return <Clock onEvent={event => console.log(event)} />
}