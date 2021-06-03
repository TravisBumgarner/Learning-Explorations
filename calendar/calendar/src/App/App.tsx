import * as React from 'react'
import styled from 'styled-components'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const countAbsences = (weeklyAttendance) => {
    return Object.values(weeklyAttendance).filter((date) => date === 'absent')
        .length
}

const statusSymbolLookup = {
    present: '✅',
    late: '⚠️',
    absent: '❌',
}

const DATA_FROM_SERVER = [
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

const NEW_DATA_FROM_SERVER = {
    Andy: {
        '07': 'present',
        '08': 'absent',
        '09': 'present',
        '10': 'absent',
        '11': 'absent',
        '12': 'late',
        '13': 'present',
    },
    Dwight: {
        '07': 'late',
        '08': 'present',
        '09': 'present',
        '10': 'absent',
        '11': 'absent',
        '12': 'late',
        '13': 'present',
    },
}

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

const StatusSelector = ({ status, handleStatusChange }) => {
    return (
        <ToggleButtonGroup
            value={status}
            exclusive
            onChange={(event, newStatus) => handleStatusChange(newStatus)}
        >
            <ToggleButton value="present">
                {statusSymbolLookup['present']} Present
            </ToggleButton>
            <ToggleButton value="absent">
                {statusSymbolLookup['absent']} Absent
            </ToggleButton>
            <ToggleButton value="late">
                {statusSymbolLookup['late']} Late
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

const DateAttendance = ({
    date,
    status,
    selectedDate,
    setHoveredDate,
    hoveredDate,
    setSelectedDate,
}) => {
    let backgroundColor = 'white'
    if (date === hoveredDate) {
        backgroundColor = 'yellow'
    } else if (date === selectedDate) {
        backgroundColor = 'red'
    }

    return (
        <div
            onMouseEnter={() => setHoveredDate(date)}
            onMouseLeave={() => setHoveredDate()}
            onClick={() => setSelectedDate(date)}
            style={{
                backgroundColor,
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
            }}
        >
            <div>{date}</div>
            <div>{statusSymbolLookup[status]}</div>
        </div>
    )
}

const WeeklyAttendance = ({
    weeklyAttendance,
    selectedDate,
    hoveredDate,
    setHoveredDate,
    setSelectedDate,
}) => {
    return (
        <div style={{ display: 'flex' }}>
            {Object.keys(weeklyAttendance).map((date) => (
                <DateAttendance
                    selectedDate={selectedDate}
                    key={date}
                    date={date}
                    status={weeklyAttendance[date]}
                    setHoveredDate={setHoveredDate}
                    hoveredDate={hoveredDate}
                    setSelectedDate={setSelectedDate}
                />
            ))}
        </div>
    )
}

const App = () => {
    const [selectedDate, setSelectedDate] = React.useState('07')
    const [hoveredDate, setHoveredDate] = React.useState()
    const [attendanceData, setAttendanceData] =
        React.useState(NEW_DATA_FROM_SERVER)

    const handleStatusChange = (studentName, date, status) => {
        setAttendanceData((oldData) => ({
            ...oldData,
            [studentName]: {
                ...oldData[studentName],
                [date]: status,
            },
        }))
    }

    return (
        <Wrapper>
            <Table>
                <Header>
                    <HeaderRow>
                        <HeaderCell>Student Name</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Weekly Attendance</HeaderCell>
                        <HeaderCell>Absences</HeaderCell>
                    </HeaderRow>
                </Header>
                <Body>
                    {Object.keys(attendanceData).map((studentName) => {
                        return (
                            <BodyRow>
                                <BodyCell>{studentName}</BodyCell>
                                <BodyCell>
                                    <StatusSelector
                                        status={
                                            attendanceData[studentName][
                                                selectedDate
                                            ]
                                        }
                                        handleStatusChange={(newStatus) =>
                                            handleStatusChange(
                                                studentName,
                                                selectedDate,
                                                newStatus
                                            )
                                        }
                                    />
                                </BodyCell>
                                <BodyCell>
                                    <WeeklyAttendance
                                        weeklyAttendance={
                                            attendanceData[studentName]
                                        }
                                        selectedDate={selectedDate}
                                        hoveredDate={hoveredDate}
                                        setHoveredDate={setHoveredDate}
                                        setSelectedDate={setSelectedDate}
                                    />
                                </BodyCell>
                                <BodyCell>
                                    {countAbsences(attendanceData[studentName])}
                                </BodyCell>
                            </BodyRow>
                        )
                    })}
                </Body>
            </Table>
        </Wrapper>
    )
}

export default App
