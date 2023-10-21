import { useRef } from 'react'
import {
  Agenda,
  Day,
  DragAndDrop,
  EventRenderedArgs,
  Inject,
  Month,
  Resize,
  ScheduleComponent,
  Week,
  WorkWeek
} from '@syncfusion/ej2-react-schedule'
import { extend } from '@syncfusion/ej2-base'
import { Data } from '~/data'
import { DashboardWrapper } from '~/pages/Dashboard/styles.ts'
import { ActionEventArgs } from '@syncfusion/ej2-schedule/src/schedule/base/interface'


const Dashboard = () => {

  const scheduleObj = useRef<ScheduleComponent>(null)
  const data: Record<string, any>[] = extend([], (Data.DATASOURCE as Record<string, any>).zooEventsData, undefined, true) as Record<string, any>[]

  const onEventRendered = (args: EventRenderedArgs): void => {
    let categoryColor: string = args.data.CategoryColor as string
    if (!args.element || !categoryColor) {
      return
    }
    if (scheduleObj?.current?.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor
    } else {
      args.element.style.backgroundColor = categoryColor
    }
  }

  const actionComplete = (args: ActionEventArgs): void => {
    console.log(args)
  }

  return (
    <DashboardWrapper className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='90vh' selectedDate={new Date(2021, 1, 15)} ref={scheduleObj}
                             eventSettings={{ dataSource: data }} eventRendered={onEventRendered}
                             actionComplete={actionComplete}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
    </DashboardWrapper>
  )
}

export default Dashboard
