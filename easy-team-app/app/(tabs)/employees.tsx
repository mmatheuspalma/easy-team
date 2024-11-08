import { useRef, useMemo, useLayoutEffect } from "react";
import { EmployeeListRef, EmployeesTimesheet } from "@easyteam/ui";

export default function EmployeesScreen({ route, navigation }: { route: any, navigation: any }) {
  const ref = useRef<EmployeeListRef>(null);

	const startDate = useMemo(() => {
    return route?.params ? route.params?.startDate : undefined;
  }, [route?.params]);

  const endDate = useMemo(() => {
    return route?.params ? route.params.endDate : undefined;
  }, [route?.params]);

  // useLayoutEffect(() => {
  //   // Reload the report data when the screen is focused
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     ref.current?.reloadData();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <EmployeesTimesheet
      ref={ref}
      onEmployeeReportPress={({ employeeId, startDate, endDate }) =>
        navigation.navigate('Timesheet', { employeeId, startDate, endDate })
      }
      onEvent={event => console.log(event)}
      startDate={startDate}
      endDate={endDate}
    />
  );
}