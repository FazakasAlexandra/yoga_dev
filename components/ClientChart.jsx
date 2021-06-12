import Chart from 'react-google-charts'

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
    },
    fontName: 'Roboto',
  }

  const attendedClasses = info.filter(
    (element) => element.state == 'present'
  ).length
  const absentClasses = info.filter(
    (element) => element.state == 'absent'
  ).length
  const cancelledClasses = info.filter(
    (element) => element.state == 'canceled'
  ).length

  return (
    <div className='client-chart'>
      <h3>Attendences</h3>
      <Chart
        width={'100%'}
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        data={[
          ['Classes', 'Attendence'],
          ['Attended classes', attendedClasses],
          ['Canceled Classes', cancelledClasses],
          ['Absent Classes', absentClasses],
        ]}
        options={pieOptions}
        rootProps={{ 'data-testid': '7' }}
      />
    </div>
  )
}
