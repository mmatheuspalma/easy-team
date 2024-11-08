
import { Timesheet, TimesheetRef, AddButton } from '@easyteam/ui';
import { useRef, useState, useCallback, useLayoutEffect } from 'react';

export default function TimesheetScreen({ navigation, route }: any) {
  const ref = useRef<TimesheetRef>(null);

  const {
    employeeId,
    startDate: pStartDate,
    endDate: pEndDate,
  } = route.params ?? {};

  const [startDate, setStartDate] = useState<string | undefined>(pStartDate);
  const [endDate, setEndDate] = useState<string | undefined>(pEndDate);

	const handleBack = useCallback(() => {
    if (ref.current) {
      navigation.navigate('Employees', {
        startDate,
        endDate,
      });
    }
  }, [navigation, startDate, endDate, ref]);
	  
	  
  useLayoutEffect(() => {
    // Allow the user to add a new shift if they have write permissions
    if (ref.current?.adminWritePermissions) {
      // Add a button to the header to add a new shift
      navigation.setOptions({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <AddButton
            onPress={() =>
              navigation.navigate("Shift Form", {
                employeeId: ref.current!.selectedEmployeeId,
              })
            }
          />
        ),
      });

      // Reload the data when the screen is focused
      const unsubscribe = navigation.addListener("focus", () => {
        ref.current?.reloadData();
      });

      return unsubscribe;
    }
  }, [navigation]);

  return (<>
    <button onClick={handleBack} title="Back" />
    <Timesheet
      ref={ref}
      onDateRangeChange={(newStartDate: string, newEndDate: string) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
      }}
      startDate={startDate}
      endDate={endDate}
      employeeId={employeeId}
      onEditPress={(date: string, selectedEmployeeId: string) =>
        navigation.navigate("Shift Form", {
          date,
          employeeId: selectedEmployeeId,
        })
      }
      onEvent={event => console.log(event)}
    />
  </>
  );
}