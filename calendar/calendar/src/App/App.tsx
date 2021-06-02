import * as React from 'react'
import styled from 'styled-components'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const countAbsences = (weeklyAttendance) => {
    return Object.values(weeklyAttendance).filter(date => date === 'absent').length
}

const statusSymbolLookup = {
    'present': '✅' ,
    'late': '⚠️',
    'absent': '❌'
}

const DATA = [
    {
        studentName: 'Andy',
        weeklyAttendance: {
            '07': 'present',
            '08': 'absent',
            '09': 'present',
            '10': 'absent',
            '11': 'absent',
            '12': 'late',
            '13': 'present',
        },
    },
    {
        studentName: 'Dwight',
        weeklyAttendance: {
            '07': 'late',
            '08': 'present',
            '09': 'present',
            '10': 'absent',
            '11': 'absent',
            '12': 'late',
            '13': 'present',
        },
    },
]

const Wrapper = styled.div``

const Table = styled.table``

const Header = styled.thead``

const Body = styled.tbody``

const HeaderRow = styled.tr``

const BodyRow = styled.tr``

const BodyCell = styled.td`
    border-right: 1px solid black;
    border-bottom: 1px solid black;
`

const HeaderCell = styled.th`
    border-right: 1px solid black;
    border-bottom: 1px solid black;
`

const StatusSelector = ({status}) => {
    const [alignment, setAlignment] = React.useState(status)

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value="present">
              {statusSymbolLookup['present']} Present
            </ToggleButton>
            <ToggleButton value="absent">
            {statusSymbolLookup['absent']}  Absent
            </ToggleButton>
            <ToggleButton value="late">
            {statusSymbolLookup['late']}  Late
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

const DayAttendance = ({day, status, selectedDate}) => {
    return (
        <div style={{backgroundColor: day === selectedDate ? 'red' : '', display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <div>{day}</div>
            <div>{statusSymbolLookup[status]}</div>
        </div>
    )
    
}

const WeeklyAttendance = ({weeklyAttendance, selectedDate}) => {
    return <div style={{display: 'flex'}}>
        {Object.keys(weeklyAttendance).map(day => <DayAttendance selectedDate={selectedDate} key={day} day={day} status={weeklyAttendance[day]} /> )}
    </div>
}

const App = () => {
    const [selectedDate, setSelectedDate] = React.useState('07')

    return (
        <Wrapper>
            <Table>
                <Header>
                    <HeaderRow>
                        <HeaderCell>Student Name</HeaderCell>
                        <HeaderCell>Status (Today)</HeaderCell>
                        <HeaderCell>Weekly Attendance</HeaderCell>
                        <HeaderCell>Absences</HeaderCell>
                    </HeaderRow>
                </Header>
                <Body>
                    {
                        DATA.map(({studentName, weeklyAttendance}) => {
                            return (
                            <BodyRow>
                                <BodyCell>{studentName}</BodyCell>
                                <BodyCell><StatusSelector status={weeklyAttendance[selectedDate]} /></BodyCell>
                                <BodyCell><WeeklyAttendance weeklyAttendance={weeklyAttendance} selectedDate={selectedDate}/></BodyCell>
                                <BodyCell>{countAbsences(weeklyAttendance)}</BodyCell>
                            </BodyRow>
                            )
                        })
                    
                </Body>
            </Table>
        </Wrapper>
    )
}

export default App
