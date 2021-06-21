import Chart from 'react-google-charts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function ClientChart({ info }) {
  const pieOptions = {
    title: '',
    slices: [
      {
        color: '#33d460',
      },
      {
        color: '#ff5d23',
      },
      {
        color: '#c32121',
      },
    ],
    legend: {
      position: 'right',
      alignment: 'start',
      textStyle: {
        color: '#646262',
        fontSize: 16,
      },
    },
    pieSliceText: 'none',
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 0,
      top: 20,
      width: '100%',
      height: '100%',
      overflow: 'visible !important'
    },
    fontName: 'Roboto',
  }

  const attendedClasses = info.filter(
    (element) => element.state == 'present'
  ).length
  const absentClasses = info.filter(
    (element) => element.state == 'absent'
  ).length
  const canceledClasses = info.filter(
    (element) => element.state == 'canceled'
  ).length

  return (
    <div className='client-chart'>
      <h3>Attendences</h3>
      <Chart
        width={'100%'}
        height={'250px'}
        chartType='PieChart'
        loader={<><FontAwesomeIcon size="2x" icon={faSpinner} spin /><p>Loading chart...</p></>}
        data={[
          ['Classes', 'Attendence'],
          ['Attended classes', attendedClasses],
          ['Canceled Classes', canceledClasses],
          ['Absent Classes', absentClasses],
        ]}
        options={pieOptions}
        rootProps={{ 'data-testid': '7' }}
      />
    </div>
  )
}
